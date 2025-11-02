-- Allow all operations on car-images bucket
CREATE POLICY "Allow all operations on car-images" ON storage.objects
FOR ALL USING (bucket_id = 'car-images');

-- Allow public access to car-images bucket
CREATE POLICY "Allow public read access on car-images" ON storage.objects
FOR SELECT USING (bucket_id = 'car-images');

-- Allow authenticated users to upload to car-images bucket
CREATE POLICY "Allow authenticated upload to car-images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'car-images');