# findyourcup-playground

Playground repo for Find Your Cup.

## Auth (Supabase)

Create a local `.env` (not committed) with:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_public_anon_key
```

Client is initialized in `authentication/frontend/src/services/supabaseClient.ts`.

Optional next steps (not yet implemented): auth service wrapper, AuthProvider, protected routes.
