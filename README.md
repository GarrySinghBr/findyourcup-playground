# findyourcup-playground

Playground repo for Find Your Cup.

## Auth (Supabase)

We have a basic working Sign-in/Login with our Supabase dashboard setup. 

To test, create a local `.env` (not committed) with:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_public_anon_key
```

Due to Supabase limitations, we will likely need to use another Email provider as they have strict limits. However, most of our auth requirements should be met with what they have.
