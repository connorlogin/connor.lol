-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public.logs
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created_at timestamp with time zone DEFAULT now(),
    type text COLLATE pg_catalog."default" NOT NULL,
    data json,
    session_id uuid NOT NULL,
    CONSTRAINT logs_pkey PRIMARY KEY (id),
    CONSTRAINT logs_session_id_fkey FOREIGN KEY (session_id)
        REFERENCES public.sessions (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.logs
    OWNER to postgres;

ALTER TABLE IF EXISTS public.logs
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.logs TO anon;

GRANT ALL ON TABLE public.logs TO authenticated;

GRANT ALL ON TABLE public.logs TO postgres;

GRANT ALL ON TABLE public.logs TO service_role;

CREATE TABLE IF NOT EXISTS public.sessions
(
    created_at timestamp with time zone DEFAULT now(),
    data json NOT NULL DEFAULT '{}'::json,
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    CONSTRAINT sessions_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.sessions
    OWNER to postgres;

ALTER TABLE IF EXISTS public.sessions
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.sessions TO anon;

GRANT ALL ON TABLE public.sessions TO authenticated;

GRANT ALL ON TABLE public.sessions TO postgres;

GRANT ALL ON TABLE public.sessions TO service_role;
