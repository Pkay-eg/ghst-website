import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { contactFormSchema, contactFormHtmlSchema, type ContactFormPayload } from "@/lib/validate-contact";

async function sendEmail(data: ContactFormPayload) {
  const escaped = contactFormHtmlSchema.parse(data);

  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  await sgMail.send({
    to: process.env.CONTACT_TO_EMAIL || "treasury@cede.to",
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: `[${data.inquiry}] — ${data.name || "GHST enquiry"}`,
    text: `Name:    ${data.name}
Email:   ${data.email}
Company: ${data.company || "—"}
Topic:   ${data.inquiry}

${data.message}`,
    html: `<p><strong>Name:</strong> ${escaped.name}</p>
<p><strong>Email:</strong> ${escaped.email}</p>
<p><strong>Company:</strong> ${escaped.company || "—"}</p>
<p><strong>Topic:</strong> ${escaped.inquiry}</p>
<p>${escaped.message.replace(/\n/g, "<br />")}</p>`,
  });
}

async function postToSlack(data: ContactFormPayload) {
  const r = await fetch(process.env.SLACK_WEBHOOK_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `*New contact form submission*\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Company:* ${data.company || "—"}\n*Topic:* ${data.inquiry}\n*Message:* ${data.message}`,
    }),
  });
  if (!r.ok) throw new Error(`Slack webhook HTTP ${r.status}`);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const [emailResult, slackResult] = await Promise.allSettled([
    sendEmail(parsed.data),
    postToSlack(parsed.data),
  ]);

  const emailSent = emailResult.status === "fulfilled";
  const slackSent = slackResult.status === "fulfilled";

  if (!emailSent) console.error("[contact] SendGrid failed:", (emailResult as PromiseRejectedResult).reason);
  if (!slackSent) console.error("[contact] Slack webhook failed:", (slackResult as PromiseRejectedResult).reason);

  if (!emailSent && !slackSent) {
    return NextResponse.json({ ok: false, emailSent, slackSent, error: "Failed to deliver message" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, emailSent, slackSent });
}
