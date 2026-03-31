-- =============================================================================
-- Add or Update Vault Secrets (single statement for supabase db query)
-- =============================================================================
-- IMPORTANT: For local development, set VAULT_SUPABASE_URL to
-- 'http://host.docker.internal:54321' so triggers inside Docker can reach the host.

DO $$
DECLARE
    secret_name TEXT;
    secret_value TEXT;
    secret_description TEXT := NULL;
    existing_secret_id UUID;
BEGIN
    secret_name := 'supabase_url';
    secret_value := {{{ SUPABASE_URL }}};
    SELECT id INTO existing_secret_id
    FROM vault.secrets
    WHERE name = secret_name
    LIMIT 1;

    IF existing_secret_id IS NOT NULL THEN
        PERFORM vault.update_secret(
            secret_id := existing_secret_id,
            new_secret := secret_value,
            new_description := secret_description
        );
    ELSE
        PERFORM vault.create_secret(
            new_secret := secret_value,
            new_name := secret_name,
            new_description := COALESCE(secret_description, '')
        );
    END IF;

    secret_name := 'supabase_secret_key';
    secret_value := {{{ SUPABASE_SECRET_KEY }}};
    existing_secret_id := NULL;
    SELECT id INTO existing_secret_id
    FROM vault.secrets
    WHERE name = secret_name
    LIMIT 1;

    IF existing_secret_id IS NOT NULL THEN
        PERFORM vault.update_secret(
            secret_id := existing_secret_id,
            new_secret := secret_value,
            new_description := secret_description
        );
    ELSE
        PERFORM vault.create_secret(
            new_secret := secret_value,
            new_name := secret_name,
            new_description := COALESCE(secret_description, '')
        );
    END IF;
END $$;
