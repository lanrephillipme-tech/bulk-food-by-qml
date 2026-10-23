const params = new URLSearchParams(window.location.hash.slice(1));
const query = new URLSearchParams(window.location.search);
const authType = params.get("type") || query.get("type") || "";
const heading = document.querySelector("#heading");
const message = document.querySelector("#message");
const form = document.querySelector("#reset-form");
let recoveryToken = "";

// Keep returned credentials out of history, links, storage, and subsequent requests.
history.replaceState(null, "", window.location.pathname);
const error = params.get("error_description") || query.get("error_description") || params.get("error") || query.get("error");
if (error) {
  heading.textContent = "This link could not be verified";
  message.textContent = "The link may have expired or already been used. Request a new link and try again.";
} else if (params.get("access_token") && params.get("type") === "recovery") {
  recoveryToken = params.get("access_token");
  heading.textContent = "Choose a new password";
  message.textContent = "Use at least 8 characters.";
  form.hidden = false;
} else if (params.get("access_token")) {
  heading.textContent = authType === "signup" ? "Your email is confirmed" : "Your secure link is ready";
  message.textContent = authType === "signup"
    ? "Your QML Foods account is activated. Open QML and sign in with your email and password."
    : "Return to QML to continue securely.";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const password = document.querySelector("#password");
  const confirmation = document.querySelector("#confirm-password");
  const button = form.querySelector("button");
  if (button.disabled) return;
  if (password.value !== confirmation.value) {
    message.textContent = "Passwords do not match.";
    return;
  }
  button.disabled = true;
  message.textContent = "Updating password...";
  try {
    const response = await fetch("/api/auth/password-update", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${recoveryToken}` },
      body: JSON.stringify({ password: password.value })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not update password. Request a new reset link.");
    recoveryToken = "";
    form.reset();
    form.hidden = true;
    heading.textContent = "Password updated";
    message.textContent = "Open QML and sign in with your new password.";
  } catch (error) {
    message.textContent = error.message || "Could not reach QML. Please try again.";
  } finally {
    button.disabled = false;
  }
});
