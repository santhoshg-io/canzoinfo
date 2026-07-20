import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

function ensureEnvLoaded() {
  if (!process.env.SMTP_PASS) {
    try {
      const envPath = path.resolve(process.cwd(), ".env");
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, "utf-8");
        for (const line of content.split("\n")) {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
            const [key, ...valParts] = trimmed.split("=");
            const val = valParts.join("=").trim().replace(/^["']|["']$/g, "");
            if (key.trim()) {
              process.env[key.trim()] = val;
            }
          }
        }
      }
    } catch (e) {
      console.warn("[SMTP Env Loader] Could not auto-read .env file", e);
    }
  }
}

export interface SendEmailPayload {
  _subject?: string;
  _gotcha?: string;
  website_hp?: string;
  Name?: string;
  Phone?: string;
  email?: string;
  Role?: string;
  Experience?: string;
  College?: string;
  Department?: string;
  "Year of Study"?: string;
  Interests?: string;
  "Other Interest"?: string;
  "Skill Level"?: string;
  "Has Laptop"?: string;
  "Canteen Name"?: string;
  "College Name"?: string;
  City?: string;
  Outlets?: string;
  "Daily Orders"?: string;
  "Presentation Link"?: string;
  "Resume Link"?: string;
  Portfolio?: string;
  "Institution / Canteen"?: string;
  Message?: string;
  [key: string]: any;
}

export async function processSmtpEmail(payload: SendEmailPayload) {
  // Ensure .env variables are loaded
  ensureEnvLoaded();

  // Honeypot check
  if (payload._gotcha || payload.website_hp) {
    return { success: true, message: "Submission accepted" };
  }

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER || "tamiltamilboss090@gmail.com";
  const pass = process.env.SMTP_PASS || "";
  const toEmail = process.env.TO_EMAIL || "tamiltamilboss090@gmail.com";

  if (!pass) {
    console.warn("[SMTP Warning] SMTP_PASS environment variable is not configured. Email dispatch requires valid credentials in .env");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const subject = payload._subject || `New Form Submission from ${payload.Name || payload.email || "Website User"}`;
  const replyTo = payload.email || user;

  // Build clean HTML table of all submitted key-value pairs
  const rowsHtml = Object.entries(payload)
    .filter(([key]) => !key.startsWith("_") && key !== "website_hp")
    .map(([key, val]) => {
      const displayVal = typeof val === "string" && (val.startsWith("http://") || val.startsWith("https://"))
        ? `<a href="${val}" target="_blank" style="color: #f59e0b; text-decoration: underline;">${val}</a>`
        : String(val);
      return `
        <tr>
          <td style="padding: 10px 14px; border-bottom: 1px solid #27272a; font-weight: 600; color: #a1a1aa; width: 35%;">${key}</td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #27272a; color: #f4f4f5;">${displayVal}</td>
        </tr>
      `;
    })
    .join("");

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; }
          .header { background: #27272a; padding: 20px 24px; border-bottom: 1px solid #3f3f46; }
          .header h2 { margin: 0; font-size: 20px; color: #ffffff; }
          .body { padding: 24px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          .footer { padding: 16px 24px; background: #09090b; text-align: center; font-size: 12px; color: #71717a; border-top: 1px solid #27272a; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📬 ${subject}</h2>
          </div>
          <div class="body">
            <p style="margin-top: 0; color: #a1a1aa; font-size: 14px;">You received a new submission from the Canzo Website:</p>
            <table>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </div>
          <div class="footer">
            Sent via Direct SMTP Transport • Canzo Smart Campus Canteen Platform
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: `"Canzo Platform" <${user}>`,
    to: toEmail,
    replyTo: replyTo,
    subject: subject,
    html: htmlContent,
  };

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
}

// Vercel Serverless Function Export
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    const payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const result = await processSmtpEmail(payload);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("[SMTP Server Error]", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to send email via SMTP.",
    });
  }
}
