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

export function escapeHtml(text: string): string {
  if (typeof text !== "string") return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .replace(/`/g, "&#x60;");
}

export function sanitizeUrlServer(url: string | undefined | null): string {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:") ||
    lower.startsWith("file:")
  ) {
    return "";
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    if (!trimmed.includes(":")) {
      return `https://${trimmed}`;
    }
  }
  return "";
}

const ipCache = new Map<string, number[]>();

export function rateLimitIp(ip: string, limit: number = 10, windowMs: number = 60000): boolean {
  if (!ip) return true;
  const now = Date.now();
  const timestamps = ipCache.get(ip) || [];
  
  // Filter timestamps in current window
  const activeTimestamps = timestamps.filter(ts => now - ts < windowMs);
  
  if (activeTimestamps.length >= limit) {
    return false; // Rate limit exceeded
  }
  
  activeTimestamps.push(now);
  ipCache.set(ip, activeTimestamps);
  return true;
}

export function clearRateLimitCache() {
  ipCache.clear();
}

export function verifyCsrf(headers: any): boolean {
  if (!headers) return true;
  const origin = headers.origin || headers.Origin || headers.origin;
  const referer = headers.referer || headers.Referer || headers.referer;

  // Allow if no origin and referer (for tests or backend-to-backend calls)
  if (!origin && !referer) {
    return true;
  }

  const allowedOrigins = [
    /^https?:\/\/localhost(:\d+)?$/,
    /^https?:\/\/127\.0\.0\.1(:\d+)?$/,
    /^https:\/\/([a-zA-Z0-9-]+\.)?canzo\.in$/,
    /^https:\/\/([a-zA-Z0-9-]+\.)?vercel\.app$/
  ];

  const checkUrl = (urlStr: string) => {
    try {
      const url = new URL(urlStr);
      return allowedOrigins.some((regex) => regex.test(url.origin));
    } catch {
      return false;
    }
  };

  if (origin && !checkUrl(origin)) {
    return false;
  }

  if (referer && !checkUrl(referer)) {
    return false;
  }

  return true;
}

export function validatePayload(payload: SendEmailPayload): { isValid: boolean; error?: string } {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\+?[\d\s-]{10,15}$/;

  const checkString = (val: any, min: number, max: number) => {
    if (val === undefined || val === null) return true;
    if (typeof val !== "string") return false;
    const len = val.trim().length;
    return len >= min && len <= max;
  };

  const checkRequiredString = (val: any, min: number, max: number) => {
    if (typeof val !== "string") return false;
    const len = val.trim().length;
    return len >= min && len <= max;
  };

  const checkEnum = (val: any, allowed: string[]) => {
    if (val === undefined || val === null) return true;
    return typeof val === "string" && allowed.includes(val);
  };

  const checkUrl = (val: any) => {
    if (val === undefined || val === null || val === "") return true;
    if (typeof val !== "string") return false;
    const cleanUrl = sanitizeUrlServer(val);
    return cleanUrl !== "";
  };

  // Validate Name
  if (payload.Name !== undefined) {
    if (!checkRequiredString(payload.Name, 2, 100)) {
      return { isValid: false, error: "Name must be between 2 and 100 characters." };
    }
  }

  // Validate Email
  if (payload.email !== undefined) {
    if (typeof payload.email !== "string" || !emailRegex.test(payload.email.trim())) {
      return { isValid: false, error: "Please enter a valid email address." };
    }
  }

  // Validate Phone
  if (payload.Phone !== undefined) {
    const cleanPhone = payload.Phone.trim().replace(/[\s-]/g, "");
    if (typeof payload.Phone !== "string" || !phoneRegex.test(cleanPhone)) {
      return { isValid: false, error: "Please enter a valid phone number (10-15 digits)." };
    }
  }

  // Validate Institution/Canteen/College Name
  if (payload["College Name"] !== undefined && !checkRequiredString(payload["College Name"], 2, 200)) {
    return { isValid: false, error: "College Name must be between 2 and 200 characters." };
  }
  if (payload["Canteen Name"] !== undefined && !checkRequiredString(payload["Canteen Name"], 2, 200)) {
    return { isValid: false, error: "Canteen Name must be between 2 and 200 characters." };
  }
  if (payload["Institution / Canteen"] !== undefined && !checkRequiredString(payload["Institution / Canteen"], 2, 200)) {
    return { isValid: false, error: "Institution / Canteen name must be between 2 and 200 characters." };
  }
  if (payload.College !== undefined && !checkRequiredString(payload.College, 2, 200)) {
    return { isValid: false, error: "College name must be between 2 and 200 characters." };
  }

  // Validate City
  if (payload.City !== undefined && !checkRequiredString(payload.City, 2, 100)) {
    return { isValid: false, error: "City must be between 2 and 100 characters." };
  }

  // Validate Department
  if (payload.Department !== undefined && !checkRequiredString(payload.Department, 2, 200)) {
    return { isValid: false, error: "Department must be between 2 and 200 characters." };
  }

  // Validate Enums
  if (payload["Year of Study"] !== undefined && !checkEnum(payload["Year of Study"], ["1st Year", "2nd Year", "3rd Year", "4th Year"])) {
    return { isValid: false, error: "Invalid Year of Study." };
  }
  if (payload["Skill Level"] !== undefined && !checkEnum(payload["Skill Level"], ["Beginner", "Intermediate", "Advanced"])) {
    return { isValid: false, error: "Invalid Skill Level." };
  }
  if (payload["Has Laptop"] !== undefined && !checkEnum(payload["Has Laptop"], ["Yes", "No"])) {
    return { isValid: false, error: "Invalid Laptop option." };
  }
  if (payload.Outlets !== undefined && !checkEnum(payload.Outlets, ["1", "2-3", "4-10", "10+"])) {
    return { isValid: false, error: "Invalid outlet count." };
  }
  if (payload["Daily Orders"] !== undefined && !checkEnum(payload["Daily Orders"], ["Less than 50", "50-150", "150-300", "300+"])) {
    return { isValid: false, error: "Invalid daily order count." };
  }
  if (payload.Experience !== undefined && !checkEnum(payload.Experience, ["Fresher", "1-3 Years", "3-5 Years", "5+ Years"])) {
    return { isValid: false, error: "Invalid Experience value." };
  }

  // Validate URL fields
  if (payload.Portfolio !== undefined && !checkUrl(payload.Portfolio)) {
    return { isValid: false, error: "Portfolio must be a valid HTTP/HTTPS URL." };
  }
  if (payload["Resume Link"] !== undefined && !checkUrl(payload["Resume Link"])) {
    return { isValid: false, error: "Resume link must be a valid HTTP/HTTPS URL." };
  }
  if (payload["Presentation Link"] !== undefined && !checkUrl(payload["Presentation Link"])) {
    return { isValid: false, error: "Presentation link must be a valid HTTP/HTTPS URL." };
  }

  // Validate Message
  if (payload.Message !== undefined && !checkString(payload.Message, 0, 1000)) {
    return { isValid: false, error: "Message cannot exceed 1000 characters." };
  }

  return { isValid: true };
}

export async function processSmtpEmail(payload: SendEmailPayload) {
  // Ensure .env variables are loaded
  ensureEnvLoaded();

  // Honeypot check
  if (payload._gotcha || payload.website_hp) {
    return { success: true, message: "Submission accepted" };
  }

  // Validate payload first
  const validation = validatePayload(payload);
  if (!validation.isValid) {
    throw new Error(validation.error || "Invalid form submission data.");
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
      const stringVal = String(val);
      const isUrl = typeof val === "string" && (stringVal.startsWith("http://") || stringVal.startsWith("https://"));
      const safeUrl = isUrl ? sanitizeUrlServer(stringVal) : "";

      const displayVal = safeUrl
        ? `<a href="${escapeHtml(safeUrl)}" target="_blank" style="color: #f59e0b; text-decoration: underline;">${escapeHtml(stringVal)}</a>`
        : escapeHtml(stringVal);
      return `
        <tr>
          <td style="padding: 10px 14px; border-bottom: 1px solid #27272a; font-weight: 600; color: #a1a1aa; width: 35%;">${escapeHtml(key)}</td>
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
            <h2>📬 ${escapeHtml(subject)}</h2>
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

  // Server-side CSRF validation
  if (!verifyCsrf(req.headers)) {
    return res.status(403).json({ success: false, message: "Forbidden: CSRF check failed." });
  }

  // Server-side IP rate limiting
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
  const cleanIp = typeof ip === "string" ? ip.split(",")[0].trim() : "anonymous";
  if (!rateLimitIp(cleanIp, 5, 60000)) {
    return res.status(429).json({ success: false, message: "Too many requests. Please try again later." });
  }

  try {
    const payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    
    // Server-side validation check
    const validation = validatePayload(payload);
    if (!validation.isValid) {
      return res.status(400).json({ success: false, message: validation.error });
    }

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
