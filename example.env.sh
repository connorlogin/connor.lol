# Copy this file to .env.sh and fill in the environment variables below. The
# .env.sh file is only used when running the app locally. In Deno Deploy, these
# environment variables need to be set using Deploy's web interface

export DEV=1 # Comment this out in production
export SUPABASE_URL= # supabase start -> API URL
export SUPABASE_KEY= # supabase start -> service_role key
export COOKIE_KEY=dev-cookie-key
