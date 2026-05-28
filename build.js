#!/usr/bin/env node
/**
 * GHST site build
 * ----------------
 * 1. Transforms design components in "GHST Website/components/" into ES modules
 * 2. Bundles each page with esbuild (pre-compiled JSX, no runtime Babel)
 * 3. Inlines CSS into self-contained HTML pages at the repo root
 *
 * Run: npm run build
 */
const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

const ROOT = __dirname;
const SRC = path.join(ROOT, "GHST Website");
const BUILD = path.join(ROOT, ".build");
const COMPONENTS_OUT = path.join(BUILD, "components");
const DIST = path.join(ROOT, "dist");

const read = (p) => fs.readFileSync(p, "utf8");

const HOOK_ALIASES = [
  ["useStateO", "useState"],
  ["useEffectO", "useEffect"],
  ["useState2", "useState"],
  ["useEffect2", "useEffect"],
  ["useState3", "useState"],
  ["useStateE", "useState"],
  ["useEffectE", "useEffect"],
  ["useStateA", "useState"],
  ["useStateC", "useState"],
];

const CROSS_IMPORTS = {
  "Sections1.jsx": {
    "./Onchain.jsx": ["useOnchainStats", "useLiveAge", "fmtCedi", "GHST_CONTRACT"],
    "./Icons.jsx": ["ArrowRight", "Check"],
  },
  "Sections2.jsx": {
    "./Onchain.jsx": ["useOnchainStats", "useLiveAge", "fmtCedi", "fmtInt"],
    "./Icons.jsx": ["Check", "Copy"],
  },
  "Sections3.jsx": {
    "./Icons.jsx": ["ArrowRight", "Check", "Plus"],
    "./Onchain.jsx": ["useOnchainStats", "fmtMintVolume", "GHST_CONTRACT"],
  },
  "AboutSections.jsx": {
    "./Icons.jsx": ["ArrowRight"],
  },
};

function parseObjectAssignExports(source) {
  const exports = [];
  const re = /Object\.assign\(window,\s*\{([\s\S]*?)\}\s*\);/g;
  let match;

  while ((match = re.exec(source)) !== null) {
    for (const part of match[1].split(",")) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      const alias = trimmed.match(/^(\w+)\s*:\s*(\w+)$/);
      if (alias) exports.push({ exportAs: alias[1], local: alias[2] });
      else exports.push({ exportAs: trimmed, local: trimmed });
    }
  }

  return exports;
}

function reactImportLine(source) {
  const hooks = new Set();
  if (/useState/.test(source)) hooks.add("useState");
  if (/useEffect/.test(source)) hooks.add("useEffect");
  if (/useRef/.test(source)) hooks.add("useRef");

  const items = ["React", ...hooks];
  if (hooks.size === 0) return 'import React from "react";';
  return `import React, { ${[...hooks].join(", ")} } from "react";`;
}

function transformComponent(filename, source) {
  let code = source;

  code = code.replace(/^const \{[^}]+\} = React;\s*\n/m, "");
  code = code.replace(/^Object\.assign\(window,[\s\S]*?\);\s*\n?/gm, "");

  for (const [from, to] of HOOK_ALIASES) {
    code = code.replace(new RegExp(`\\b${from}\\b`, "g"), to);
  }
  code = code.replace(/\bReact\.useEffect\b/g, "useEffect");

  const exports = parseObjectAssignExports(source);
  const exportNames = exports.map(({ exportAs, local }) =>
    exportAs === local ? local : `${local} as ${exportAs}`
  );

  const importLines = [reactImportLine(code)];
  const cross = CROSS_IMPORTS[filename];
  if (cross) {
    for (const [mod, names] of Object.entries(cross)) {
      importLines.push(`import { ${names.join(", ")} } from "${mod}";`);
    }
  }

  if (exportNames.length) {
    code += `\nexport { ${exportNames.join(", ")} };\n`;
  }

  return `${importLines.join("\n")}\n\n${code.trim()}\n`;
}

function prepareComponents() {
  fs.rmSync(COMPONENTS_OUT, { recursive: true, force: true });
  fs.mkdirSync(COMPONENTS_OUT, { recursive: true });

  const files = fs
    .readdirSync(path.join(SRC, "components"))
    .filter((f) => f.endsWith(".jsx"));

  for (const file of files) {
    const source = read(path.join(SRC, "components", file));
    const transformed = transformComponent(file, source);
    fs.writeFileSync(path.join(COMPONENTS_OUT, file), transformed);
  }

  return files.length;
}

const css = {
  "styles/colors_and_type.css": read(path.join(SRC, "styles/colors_and_type.css")),
  "styles/site.css": read(path.join(SRC, "styles/site.css")).replace(/\.\.\/assets\//g, "assets/"),
};

function inlineStyles(html) {
  return html.replace(
    /<link rel="stylesheet" href="(styles\/[^"]+)"\s*\/>/g,
    (_m, href) => `<style>\n${css[href]}\n</style>`
  );
}

function stripRuntimeScripts(html) {
  return html
    .replace(/\s*<script src="https:\/\/unpkg\.com\/react[^"]*"[^>]*><\/script>\s*/g, "\n")
    .replace(/\s*<script src="https:\/\/unpkg\.com\/react-dom[^"]*"[^>]*><\/script>\s*/g, "\n")
    .replace(/\s*<script src="https:\/\/unpkg\.com\/@babel[^"]*"[^>]*><\/script>\s*/g, "\n")
    .replace(/\s*<script type="text\/babel" src="components\/[^"]+"><\/script>\s*/g, "\n")
    .replace(/\s*<script type="text\/babel">[\s\S]*?<\/script>\s*/g, "\n");
}

function injectBundleScripts(html, bundleName) {
  const scripts = [
    `<script defer src="dist/${bundleName}.js"></script>`,
  ].join("\n  ");

  return html.replace("</body>", `  ${scripts}\n</body>`);
}

const fixHomeLinks = (html) => html.replace(/GHST%20Landing\.html/g, "index.html");

const PAGES = [
  { src: "GHST Landing.html", out: "index.html", entry: "home", bundle: "home" },
  { src: "About.html", out: "About.html", entry: "about", bundle: "about" },
  { src: "Contact.html", out: "Contact.html", entry: "contact", bundle: "contact" },
];

async function bundlePages() {
  fs.mkdirSync(DIST, { recursive: true });

  const common = {
    bundle: true,
    minify: true,
    format: "iife",
    target: ["es2020"],
    jsx: "automatic",
    legalComments: "none",
    logLevel: "warning",
  };

  await Promise.all(
    PAGES.map(({ entry, bundle }) =>
      esbuild.build({
        ...common,
        entryPoints: [path.join(ROOT, "src/entries", `${entry}.jsx`)],
        outfile: path.join(DIST, `${bundle}.js`),
      })
    )
  );
}

function buildHtml() {
  for (const { src, out, bundle } of PAGES) {
    let html = read(path.join(SRC, src));
    html = inlineStyles(html);
    html = stripRuntimeScripts(html);
    html = injectBundleScripts(html, bundle);
    html = fixHomeLinks(html);
    fs.writeFileSync(path.join(ROOT, out), html);
    console.log(`built ${out}  (${(html.length / 1024).toFixed(1)} KB)`);
  }
}

async function main() {
  const count = prepareComponents();
  console.log(`prepared ${count} components -> .build/components/`);

  await bundlePages();

  for (const { bundle } of PAGES) {
    const stat = fs.statSync(path.join(DIST, `${bundle}.js`));
    console.log(`bundled dist/${bundle}.js  (${(stat.size / 1024).toFixed(1)} KB)`);
  }

  buildHtml();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
