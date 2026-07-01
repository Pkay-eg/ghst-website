import { z } from "zod";

export const INQUIRY_VALUES = [
  "Institutional / Mint & Redeem",
  "Developer / Integration",
  "Partnership",
  "Press / Media",
  "General",
] as const;

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  company: z.string().trim().optional().default(""),
  inquiry: z.enum(INQUIRY_VALUES),
  message: z.string().trim().min(1, "Message is required"),
});

export type ContactFormPayload = z.infer<typeof contactFormSchema>;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// HTML-escaped variant of the same payload, for interpolating into an email/HTML body
// rather than plain text — keeps escaping co-located with the field definitions above.
export const contactFormHtmlSchema = contactFormSchema.transform((data) => ({
  ...data,
  name: escapeHtml(data.name),
  email: escapeHtml(data.email),
  company: escapeHtml(data.company),
  inquiry: escapeHtml(data.inquiry),
  message: escapeHtml(data.message),
}));
