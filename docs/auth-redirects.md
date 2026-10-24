# Email confirmation and mobile previews

`http://localhost:4000/app` is the web implementation. The APK is built from the
separate `Bulk-Food-by-QML-Mobile` repository. Use that repository's
`npm run web -- --port 8083` to preview the React Native screens used by the APK.
Native launch screens and deep links still require an installed build to verify.

## Production configuration

In Render, set:

```text
PUBLIC_APP_URL=https://bulk-food-by-qml.onrender.com/app
AUTH_REDIRECT_URL=https://bulk-food-by-qml.onrender.com/auth/callback.html
NODE_ENV=production
```

In Supabase, open Authentication > URL Configuration:

- Site URL: `https://bulk-food-by-qml.onrender.com/app`
- Add `https://bulk-food-by-qml.onrender.com/auth/callback.html` to Redirect URLs.
- Add `bulkfoodqml://auth/callback` to Redirect URLs for installed mobile builds.
- Keep development URLs only as additional redirect entries, never as the production Site URL.

## Google and Apple sign-in

Enable Google and Apple under Authentication > Sign In / Providers and enter each
provider's client credentials there. The callback registered with Google and Apple
is the Supabase project callback, not QML's callback page:

`https://kwwmibamdycqzwzyacug.supabase.co/auth/v1/callback`

For Google, create an OAuth client and add that URL as an authorized redirect URI.
For Apple, configure a Sign in with Apple Services ID and associated website in the
Apple Developer account, then enter its Services ID and key details in Supabase.
Keep provider secrets in Supabase Auth settings; do not add them to the web or
mobile bundles or commit them to this repository. QML returns to the web callback
or the `bulkfoodqml://auth/callback` mobile deep link after Supabase completes auth.
The app uses the PKCE authorization-code flow: it creates a one-time verifier on
the client, sends only its SHA-256 challenge through the authorization redirect,
and exchanges the returned code plus verifier with Supabase on the backend. Do
not replace this with a callback that accepts access tokens from URL fragments.

The OAuth provider's redirect URI is the Supabase callback above. Separately,
Supabase Authentication > URL Configuration must allow the QML web callback and
mobile deep link listed earlier. These are two different redirect hops.

## Activation and welcome email

Resend's API key on Render is used by the QML backend for the post-activation welcome
email. Supabase Auth confirmation and password emails use Supabase's separate custom
SMTP settings. Configure Resend SMTP in Supabase, then check the Supabase Database
Webhook for `public.welcome_email_outbox` INSERT events as described in
`docs/welcome-email-setup.md`.

For Resend SMTP, use host `smtp.resend.com`, username `resend`, port `465` with
SSL, and a Resend API key as the SMTP password. Use a sender address on a verified
Resend domain. Keep the Auth SMTP password in Supabase Auth settings, not in the
web or mobile environment.

Use `{{ .ConfirmationURL }}` for the link in the Confirm signup and Reset password
email templates. A custom link hardcoded to localhost or `{{ .SiteURL }}` alone
does not use the requested verification URL correctly.

Signup and password recovery explicitly request the public callback. In production,
invalid, HTTP, localhost and private-IP redirect configuration is ignored in favor
of the next valid configured URL or the public Render fallback. Email callbacks
always use `/auth/callback.html` on that origin. Deploy the callback files and API
changes together before requesting new emails.

The callback removes returned credentials from the address bar, handles expired-link
errors, and offers a return to `bulkfoodqml://auth/confirm`. Confirmation does not
log the user in automatically; password sign-in checks account status with Supabase.
Recovery credentials stay only in page memory and are sent to the same-origin
password-update endpoint, which forwards the user's token to Supabase Auth.

Old emails retain their original redirect. Request a fresh confirmation or reset
email after updating settings. Do not paste verification tokens into support chats.

## Verification

Run `node --test tests/auth-redirect.test.mjs`, `npm run check`, and mobile
`npx tsc --noEmit`. Test a new email on a physical phone, including expired links,
return to app while closed/open, and password reset followed by sign-in.
These device and email checks cannot be replaced by a successful APK build.
