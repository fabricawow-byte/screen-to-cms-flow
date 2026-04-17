-- Restrict public listing on site-images bucket while keeping direct file access via public URLs.
-- The previous broad SELECT policy allowed anonymous clients to enumerate every file in the bucket.
DROP POLICY IF EXISTS "Public can view site images" ON storage.objects;

-- Allow only admins to list/enumerate objects in the bucket.
CREATE POLICY "Admins can list site images"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

-- NOTE: Because the bucket itself remains `public`, individual files are still
-- accessible via their direct getPublicUrl() links (served by the storage CDN
-- without going through RLS). This is the intended behaviour for site assets,
-- while removing the ability for anyone to enumerate the bucket contents.