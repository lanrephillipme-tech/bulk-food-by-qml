# QML welcome email setup

The signup confirmation email is sent by Supabase Auth. The welcome email is sent only after `auth.users.email_confirmed_at` transitions from null to a timestamp.

## Deploy the database trigger

Apply `supabase/migrations/20261023000100_welcome_email_outbox.sql` to the production Supabase project. It creates a private outbox table and an `auth.users` trigger. It does not send network requests inside the Auth transaction. Review the migration in the dashboard before applying it.

## Configure Render

Add these variables to the QML backend service, then redeploy:

```text
RESEND_API_KEY=<Resend API key with sending access>
RESEND_FROM_EMAIL=QML Foods <no-reply@your-verified-domain.com>
SUPABASE_WELCOME_WEBHOOK_SECRET=<long random secret>
```

Use a sender address on the verified Resend domain. Keep both secrets private. `RESEND_API_KEY` is used by the backend for the welcome message; Supabase Auth SMTP is configured separately in the Supabase dashboard for activation and password emails.

## Create the Supabase Database Webhook

1. Open **Database → Webhooks** and create a webhook named `qml-welcome-email`.
2. Select schema `public`, table `welcome_email_outbox`, and event `INSERT`.
3. Use the HTTPS endpoint `https://bulk-food-by-qml.onrender.com/api/webhooks/supabase/welcome-email`.
4. Add header `x-qml-webhook-secret` with exactly the same value as Render's `SUPABASE_WELCOME_WEBHOOK_SECRET`.
5. Save and use the dashboard's test action if available.

The endpoint verifies the shared secret, accepts only outbox INSERT events, and uses a Resend idempotency key derived from the outbox row ID. The outbox is unique per Auth user, preventing another confirmation from creating another welcome email.

## Configure the confirmation template

In **Authentication → Email Templates → Confirm signup**, copy the HTML in `docs/email-templates/confirm-signup.html`. The production redirect is supplied by `AUTH_REDIRECT_URL`; keep the link as `{{ .ConfirmationURL }}`. Do not replace it with a hard-coded local URL.

## End-to-end check

Use a new email address. Confirm that signup sends the activation mail, clicking it displays the confirmed state, Supabase creates one row in `welcome_email_outbox`, Render sends one welcome email, and the user can sign in. Check Supabase Auth logs, the outbox status, Render logs, and Resend email activity for failures. Do not test by manually modifying a real user's Auth record.
