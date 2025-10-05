# FindYourCup Authentication

Authentication system using Supabase with email/password and Google OAuth.

## Setup

### Google OAuth Configuration

If you need to set up or reconfigure Google OAuth:

1. **Google Cloud Console Setup:**

   - Go to https://console.cloud.google.com/
   - Create a new project or select existing
   - Navigate to **APIs & Services** → **OAuth consent screen**
     - Choose **External** → Fill in app name and your email
     - Add test users (your email address)
   - Navigate to **APIs & Services** → **Credentials**
     - Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
     - Application type: **Web application**
     - Under **Authorized redirect URIs**, add:
       - `https://[your-project-ref].supabase.co/auth/v1/callback`
     - Click **"CREATE"**
     - Copy both **Client ID** and **Client Secret** (click eye icon to reveal secret)

2. **Supabase Configuration:**

   - Go to Supabase Dashboard → **Authentication** → **Providers**
   - Enable **Google**
   - Paste **Client ID** and **Client Secret**
   - Note the callback URL provided by Supabase
   - Click **"Save"**

3. **Environment Variables:**
   - Ensure `.env` has:
     ```
     VITE_SUPABASE_URL=your-project-url
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

### Email Verification Configuration

To enable/disable email confirmation in Supabase:

1. Go to Supabase Dashboard → **Authentication** → **Providers** → **Email**
2. Toggle **"Confirm email"** setting:
   - **ON** (Recommended for production): Users must verify email before logging in
   - **OFF** (Easier for development): Users can login immediately after signup
3. Configure email templates (optional):
   - Navigate to **Authentication** → **Email Templates**
   - Customize the verification email design and content

**How it works:**

- When enabled, users receive a verification email after signup
- They must click the link before they can log in
- The app automatically shows a "Check your email" screen
- Users can resend the verification email if needed

### Password Reset Email Template

For the "Reset Password" email template in Supabase (**Authentication** → **Email Templates** → **Reset Password**):

See the `email-templates/reset-password.html` file in this repository for a professional template.

## Features

- ✅ Email/Password authentication
- ✅ Google OAuth sign-in
- ✅ Email verification
- ✅ Password reset
- ✅ Protected routes
- ✅ Session persistence
- ✅ Auto token refresh
- ✅ Professional email templates

## Development

```bash
cd frontend
npm install
npm run dev
```
