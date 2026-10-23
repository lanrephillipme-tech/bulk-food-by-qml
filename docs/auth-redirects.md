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

- Site URL: `https://bulk-food-by-qml.onrender.com/auth/callback.html`
- Add this exact Redirect URL: `https://bulk-food-by-qml.onrender.com/auth/callback.html`
- Keep development URLs only as additional redirect entries, never as the production Site URL.

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
