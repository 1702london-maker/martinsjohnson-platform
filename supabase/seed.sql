-- Martins Johnson product seed data
-- Run after schema.sql

insert into products
  (name, slug, price, category, gender, available, is_new_arrival, is_featured, description, image_urls, tags, metadata)
values
  -- Men's shoes
  ('The Westminster Oxford', 'westminster-oxford', 895, 'oxford', 'men', true, false, true, 'Our signature Oxford. Hand-lasted on a narrow London last with a chisel toe. Blake-stitched on a leather sole.', array['/images/categories/oxford.jpg'], array['Signature'], '{"badge":"Signature"}'),
  ('The Mayfair Derby', 'mayfair-derby', 795, 'derby', 'men', true, false, true, 'An open-lacing Derby on a slightly rounded last. Versatile, elegant, built for daily wear.', array['/images/categories/derby.jpg'], array['Bestseller'], '{"badge":"Bestseller"}'),
  ('The Chelsea Boot', 'chelsea-boot', 945, 'boot', 'men', true, true, false, 'A clean, architectural Chelsea on a block heel. Elastic gussets in matching leather.', array['/images/categories/boot.jpg'], array['New'], '{"badge":"New"}'),
  ('The Belgravia Brogue', 'belgravia-brogue', 855, 'oxford', 'men', true, false, false, 'Full-brogue detailing on our Oxford last. Punched and pinked by hand.', array['/images/categories/oxford.jpg'], array['Brogue'], '{}'),
  ('The Knightsbridge Loafer', 'knightsbridge-loafer', 775, 'loafer', 'men', true, true, false, 'A slip-on penny loafer with a leather-wrapped penny bar and leather lining.', array['/images/categories/loafer.jpg'], array['New'], '{"badge":"New"}'),
  ('The Regent Monkstrap', 'regent-monkstrap', 825, 'monkstrap', 'men', true, false, false, 'Double monk-strap on a squared toe last. Solid brass buckles. A statement of intent.', array['/images/categories/monkstrap.jpg'], array[]::text[], '{}'),
  ('The Savile Sneaker', 'savile-sneaker', 645, 'sneaker', 'men', true, false, false, 'A luxury sneaker construction with a Blake-stitched rubber cupsole. Italian nappa upper.', array['/images/categories/sneaker.jpg'], array['Limited'], '{"badge":"Limited"}'),
  ('The Kensington Slipper', 'kensington-slipper', 595, 'slipper', 'men', true, false, false, 'A velvet-lined evening slipper with hand-painted edges and grosgrain bow.', array['/images/categories/slipper.jpg'], array[]::text[], '{}'),

  -- Women's shoes
  ('The Sloane Heel', 'sloane-heel', 895, 'highheel', 'women', true, true, false, 'An 80mm block heel in full-grain calfskin. Padded insole, leather-covered heel block.', array['/images/categories/highheel.jpg'], array['New'], '{"badge":"New"}'),
  ('The Belgravia Flat', 'belgravia-flat', 645, 'loafer', 'women', true, false, false, 'A pointed-toe flat with a featherweight leather sole. Devastatingly simple.', array['/images/categories/loafer.jpg'], array['Flat'], '{}'),
  ('The Mayfair Pump', 'mayfair-pump', 825, 'highheel', 'women', true, false, true, 'A 65mm pump on our London women''s last. Hand-welted, hand-finished.', array['/images/categories/highheel.jpg'], array['Pump','Signature'], '{"badge":"Signature"}'),
  ('The Chelsea Women''s Boot', 'chelsea-women-boot', 875, 'boot', 'women', true, true, false, 'Our Chelsea in a women''s proportioned last with a 35mm block heel.', array['/images/categories/boot.jpg'], array['New'], '{"badge":"New"}'),

  -- Bags
  ('The Parliament Briefcase', 'parliament-briefcase', 1450, 'bag', 'unisex', true, false, true, 'A structured two-compartment briefcase in full-grain leather. Solid brass locks.', array['/images/categories/bag.jpg'], array['Briefcase','Signature'], '{"badge":"Signature"}'),
  ('The Knightsbridge Holdall', 'knightsbridge-holdall', 1295, 'bag', 'unisex', true, false, false, 'A weekend holdall that works as hard on Monday as it does on Friday.', array['/images/categories/bag.jpg'], array['Holdall'], '{}'),
  ('The Mayfair Tote', 'mayfair-tote', 895, 'bag', 'unisex', true, true, false, 'An open-top tote with a canvas interior and leather base. Everyday utility, luxury feel.', array['/images/categories/bag.jpg'], array['Tote','New'], '{"badge":"New"}'),

  -- Belts
  ('The Savile Belt 35mm', 'savile-belt-35', 285, 'belt', 'unisex', true, false, false, 'Full-grain leather belt on a solid brass single-prong buckle. Edges hand-burnished.', array['/images/categories/accessories.jpg'], array['35mm'], '{}'),
  ('The Regent Belt 40mm', 'regent-belt-40', 295, 'belt', 'unisex', true, false, true, 'A wider 40mm dress belt for the person who commands a room.', array['/images/categories/accessories.jpg'], array['40mm','Bestseller'], '{"badge":"Bestseller"}'),

  -- Leather goods
  ('The Westminster Wallet', 'westminster-wallet', 295, 'accessories', 'unisex', true, false, false, 'A slim six-card wallet in full-grain leather. No fuss, no bulk.', array['/images/categories/accessories.jpg'], array['Wallet'], '{}'),
  ('The Mayfair Card Holder', 'mayfair-card-holder', 195, 'accessories', 'unisex', true, true, false, 'A flat four-card holder that slips into any pocket without a trace.', array['/images/categories/accessories.jpg'], array['Card Holder','New'], '{"badge":"New"}');

select count(*) as "Products seeded" from products;
