import nodemailer from "nodemailer";

const createTransporter = () => {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      "GMAIL_USER and GMAIL_APP_PASSWORD must be set in environment variables",
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
};

export interface OrderReadyEmailData {
  toEmail: string;
  toName: string;
  orderId: string;
  orderType: "dine-in" | "take-away";
  paymentMethod: "upi" | "cash";
  items: { menuName: string; quantity: number; subtotal: number }[];
  totalAmount: number;
}

const buildOrderReadyHtml = (data: OrderReadyEmailData): string => {
  const orderTypeLabel =
    data.orderType === "dine-in" ? "🪑 Dine In" : "🥡 Take Away";
  const paymentLabel = data.paymentMethod === "upi" ? "📲 UPI" : "💵 Cash";

  const itemRows = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #2a2a48;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#c0bdb8;">
          ${item.menuName}
        </td>
        <td style="padding:10px 16px;border-bottom:1px solid #2a2a48;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#c0bdb8;text-align:center;">
          ${item.quantity}
        </td>
        <td style="padding:10px 16px;border-bottom:1px solid #2a2a48;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#f4a435;text-align:right;font-weight:700;">
          ₹${item.subtotal.toFixed(2)}
        </td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Your Order is Ready!</title></head>
<body style="margin:0;padding:0;background-color:#0e0e1a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0e0e1a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e1e36,#252540);border-radius:16px 16px 0 0;padding:36px 32px;text-align:center;border:1px solid #2a2a48;border-bottom:none;">
              <div style="font-size:48px;margin-bottom:16px;">🍽</div>
              <h1 style="margin:0 0 8px;font-size:28px;font-weight:800;color:#f0ede8;letter-spacing:-0.03em;">
                Your Order is Ready!
              </h1>
              <p style="margin:0;font-size:15px;color:#8f8fa8;">
                Head over to collect your order, ${data.toName.split(" ")[0]}.
              </p>
            </td>
          </tr>

          <!-- Accent bar -->
          <tr>
            <td style="background:linear-gradient(90deg,#f4a435,#f4d03f);height:4px;"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#16162a;padding:32px;border:1px solid #2a2a48;border-top:none;border-bottom:none;">

              <!-- Order meta chips -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td width="50%" style="padding-right:6px;">
                    <div style="background:#1e1e36;border:1px solid #2a2a48;border-radius:10px;padding:14px 16px;">
                      <p style="margin:0 0 3px;font-size:11px;color:#5a5a78;text-transform:uppercase;letter-spacing:0.07em;font-weight:700;">Order Type</p>
                      <p style="margin:0;font-size:15px;font-weight:700;color:#f0ede8;">${orderTypeLabel}</p>
                    </div>
                  </td>
                  <td width="50%" style="padding-left:6px;">
                    <div style="background:#1e1e36;border:1px solid #2a2a48;border-radius:10px;padding:14px 16px;">
                      <p style="margin:0 0 3px;font-size:11px;color:#5a5a78;text-transform:uppercase;letter-spacing:0.07em;font-weight:700;">Payment</p>
                      <p style="margin:0;font-size:15px;font-weight:700;color:#f0ede8;">${paymentLabel}</p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Order ID -->
              <p style="margin:0 0 16px;font-size:13px;color:#5a5a78;">
                Order ID: <span style="color:#8f8fa8;font-weight:600;">#${data.orderId.slice(-8).toUpperCase()}</span>
              </p>

              <!-- Items table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1e1e36;border-radius:10px;border:1px solid #2a2a48;overflow:hidden;margin-bottom:20px;">
                <thead>
                  <tr style="background:#252540;">
                    <th style="padding:10px 16px;text-align:left;font-size:11px;color:#5a5a78;text-transform:uppercase;letter-spacing:0.07em;font-weight:700;">Item</th>
                    <th style="padding:10px 16px;text-align:center;font-size:11px;color:#5a5a78;text-transform:uppercase;letter-spacing:0.07em;font-weight:700;">Qty</th>
                    <th style="padding:10px 16px;text-align:right;font-size:11px;color:#5a5a78;text-transform:uppercase;letter-spacing:0.07em;font-weight:700;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRows}
                </tbody>
              </table>

              <!-- Total -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:16px;background:#1e1e36;border-radius:10px;border:1px solid #2a2a48;">
                    <table width="100%">
                      <tr>
                        <td style="font-size:15px;font-weight:700;color:#f0ede8;">Total Amount</td>
                        <td style="text-align:right;font-size:24px;font-weight:800;color:#f4a435;">₹${data.totalAmount.toFixed(2)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#1e1e36;border-radius:0 0 16px 16px;padding:24px 32px;text-align:center;border:1px solid #2a2a48;border-top:1px dashed #2a2a48;">
              <p style="margin:0 0 8px;font-size:13px;color:#5a5a78;">
                Thank you for dining with us 🙏
              </p>
              <p style="margin:0;font-size:12px;color:#35355c;">
                This is an automated notification from Canteen Order Management.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export const sendOrderReadyEmail = async (
  data: OrderReadyEmailData,
): Promise<void> => {
  const transporter = createTransporter();

  const orderTypeText = data.orderType === "dine-in" ? "Dine In" : "Take Away";

  await transporter.sendMail({
    from: `"Canteen 🍽" <${process.env.GMAIL_USER}>`,
    to: data.toEmail,
    subject: `✅ Your order is ready — ${orderTypeText} | #${data.orderId.slice(-8).toUpperCase()}`,
    html: buildOrderReadyHtml(data),
  });
};
