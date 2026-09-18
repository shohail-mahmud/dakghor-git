REVOKE ALL ON FUNCTION public.generate_dakghor_address() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.lookup_dakghor_address(TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.lookup_dakghor_address(TEXT) TO authenticated;