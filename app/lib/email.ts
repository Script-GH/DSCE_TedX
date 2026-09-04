import nodemailer from "nodemailer";
import type { SpeakerApplicationInput } from "./validateSpeakerApplication";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (!host || !user || !password) {
    throw new Error(
      "SMTP configuration is missing. Set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASSWORD."
    );
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: true,
    auth: {
      user,
      pass: password,
    },
  });

  return transporter;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const row = (label: string, value: string) =>
  value.trim()
    ? `<tr><td style="padding:6px 12px 6px 0;color:#737373;font-size:13px;white-space:nowrap;vertical-align:top;">${esc(label)}</td><td style="padding:6px 0;color:#111;font-size:14px;">${esc(value).replace(/\n/g, "<br/>")}</td></tr>`
    : "";

export async function sendSpeakerApplicationNotification(data: SpeakerApplicationInput) {
  const to = process.env.NOTIFY_EMAIL;
  const from = process.env.NOTIFY_FROM_EMAIL || `TEDxDSCE Applications <${process.env.SMTP_USER}>`;
  if (!to) throw new Error("NOTIFY_EMAIL is not set.");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
      <h2 style="color:#E62B1E;">New TEDxDSCE Speaker Application</h2>
      <table style="border-collapse:collapse;width:100%;">
        ${row("Full Name", data.fullName)}
        ${row("Preferred Name", data.preferredName)}
        ${row("Email", data.email)}
        ${row("Phone", data.phone)}
        ${row("City", data.city)}
        ${row("State", data.state)}
        ${row("Country", data.country)}
        ${row("Organization", data.organization)}
        ${row("Designation", data.designation)}
        ${row("LinkedIn", data.linkedinProfile)}
        ${row("Website", data.website)}
        ${row("Bio", data.bio)}
        ${row("Talk Title", data.talkTitle)}
        ${row("One-Line Summary", data.oneLineSummary)}
        ${row("Big Idea", data.bigIdea)}
        ${row("Takeaway 1", data.takeaway1)}
        ${row("Takeaway 2", data.takeaway2)}
        ${row("Takeaway 3", data.takeaway3)}
        ${row("Credibility", data.credibility)}
        ${row("Spoken Before", data.spokenBefore ?? "")}
        ${row("Previous Event", data.prevEventName)}
        ${row("Previous Audience Size", data.prevAudienceSize)}
        ${row("Previous Video Link", data.prevVideoLink)}
        ${row("LinkedIn (social)", data.socialLinkedin)}
        ${row("Instagram", data.socialInstagram)}
        ${row("X (Twitter)", data.socialX)}
        ${row("YouTube", data.socialYoutube)}
        ${row("Other Social", data.socialOther)}
        ${row("Available for Rehearsals", data.availableRehearsals ?? "")}
        ${row("Available on Event Date", data.availableEventDate ?? "")}
        ${row("Additional Info", data.additionalInfo)}
      </table>
    </div>
  `;

  await getTransporter().sendMail({
    from,
    to,
    replyTo: data.email,
    subject: `New speaker application: ${data.fullName} — "${data.talkTitle}"`,
    html,
  });
}

export async function sendNewsletterConfirmation(email: string) {
  const from = process.env.NOTIFY_FROM_EMAIL || `TEDxDSCE <${process.env.SMTP_USER}>`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
      <h2 style="color:#E62B1E;">You’re on the list.</h2>
      <p style="color:#111;font-size:15px;line-height:1.6;">
        Thanks for signing up for TEDxDSCE — Rise of the Dominoes. We’ll email
        you first with ticket drops, speaker reveals and event updates.
      </p>
    </div>
  `;

  await getTransporter().sendMail({
    from,
    to: email,
    subject: "You’re on the list — TEDxDSCE",
    html,
  });
}
