import nodemailer from "nodemailer";

const EMAIL_FROM = process.env.EMAIL_FROM || "info@mwamunda.com";
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587");
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";

let transporter: nodemailer.Transporter | null = null;

export function getEmailTransporter() {
  if (transporter) {
    return transporter;
  }

  if (!SMTP_USER || !SMTP_PASS) {
    console.warn(
      "Email service not configured. SMTP_USER and SMTP_PASS environment variables are required.",
    );
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return transporter;
}

export async function sendResponseEmail(
  contactEmail: string,
  contactName: string,
  responseMessage: string,
): Promise<boolean> {
  const mailer = getEmailTransporter();

  if (!mailer) {
    console.warn(
      "Email service not configured. Response email was not sent to",
      contactEmail,
    );
    return false;
  }

  try {
    await mailer.sendMail({
      from: EMAIL_FROM,
      to: contactEmail,
      subject: `Re: Your inquiry to Mwamunda Investment Limited`,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2c3e50;">Hello ${contactName},</h2>
              
              <p>Thank you for reaching out to Mwamunda Investment Limited. We have received your inquiry and appreciate your interest in our services.</p>
              
              <div style="background-color: #f5f5f5; padding: 20px; border-left: 4px solid #3498db; margin: 20px 0;">
                <p>${responseMessage.replace(/\n/g, "<br>")}</p>
              </div>
              
              <p>If you have any further questions or would like to discuss this matter in detail, please don't hesitate to contact us:</p>
              
              <ul style="list-style: none; padding: 0;">
                <li><strong>Email:</strong> info@mwamunda.com</li>
                <li><strong>Phone:</strong> 0106673939 / 0784222284 / 0708192783</li>
                <li><strong>WhatsApp:</strong> 0784222284</li>
              </ul>
              
              <p style="margin-top: 30px; color: #666; font-size: 12px;">
                <strong>Mwamunda Investment Limited</strong><br>
                Hussein Mayai Road, Room 8<br>
                Opposite Kadzomba Plaza<br>
                Kilifi, Kenya<br>
                P.O. Box 964
              </p>
              
              <p style="color: #999; font-size: 11px; border-top: 1px solid #ddd; padding-top: 15px;">
                This is an automated response. Please do not reply to this email.
              </p>
            </div>
          </body>
        </html>
      `,
      text: `
Hello ${contactName},

Thank you for reaching out to Mwamunda Investment Limited. We have received your inquiry and appreciate your interest in our services.

${responseMessage}

If you have any further questions or would like to discuss this matter in detail, please don't hesitate to contact us:

Email: info@mwamunda.com
Phone: 0106673939 / 0784222284 / 0708192783
WhatsApp: 0784222284

Mwamunda Investment Limited
Hussein Mayai Road, Room 8
Opposite Kadzomba Plaza
Kilifi, Kenya
P.O. Box 964

This is an automated response. Please do not reply to this email.
      `,
    });

    return true;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to send response email:", errorMessage);
    return false;
  }
}
