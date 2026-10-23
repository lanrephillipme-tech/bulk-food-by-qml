function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

export function welcomeEmailHtml({ name, appUrl }) {
  const safeName = escapeHtml(String(name || "there").trim().split(/\s+/)[0] || "there");
  const safeUrl = /^https:\/\//i.test(String(appUrl || "")) ? escapeHtml(appUrl) : "https://bulk-food-by-qml.onrender.com/app";
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Welcome to QML Foods</title></head>
<body style="margin:0;background:#f3f5f2;font-family:Arial,Helvetica,sans-serif;color:#202820">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f5f2;padding:32px 12px"><tr><td align="center">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #e4e9e3;border-radius:12px;overflow:hidden">
      <tr><td style="height:6px;background:#178342;font-size:0">&nbsp;</td></tr>
      <tr><td style="padding:32px 32px 12px;text-align:center"><div style="font-size:22px;font-weight:800;letter-spacing:0;color:#178342">QML Foods</div></td></tr>
      <tr><td style="padding:12px 32px 32px;text-align:center">
        <h1 style="margin:0 0 14px;font-size:28px;line-height:1.2;color:#202820">Welcome, ${safeName}</h1>
        <p style="margin:0 auto 24px;max-width:420px;color:#59645b;font-size:16px;line-height:1.6">Your email is confirmed and your QML Foods account is ready. Discover fresh produce, everyday cooking ingredients, and local sellers in one place.</p>
        <a href="${safeUrl}" style="display:inline-block;background:#178342;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;line-height:20px;padding:14px 24px;border-radius:7px">Open QML Foods</a>
        <p style="margin:24px 0 0;color:#6a756d;font-size:13px;line-height:1.6">You can sign in with the email address and password you chose during signup.</p>
      </td></tr>
      <tr><td style="border-top:1px solid #e9ede8;padding:18px 32px;text-align:center;color:#758078;font-size:12px;line-height:1.6">QML Foods · Better access to fresh food, from local markets to your home.</td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}
