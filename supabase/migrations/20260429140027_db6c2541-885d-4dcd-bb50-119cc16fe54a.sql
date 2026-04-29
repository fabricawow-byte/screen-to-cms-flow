-- Revoke default public execute on SECURITY DEFINER functions
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;

-- Allow only authenticated users to call has_role (needed by RLS/admin checks)
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;