-- ══════════════════════════════════════════════════════
-- Martins Johnson — Product Seed Data
-- Run after schema.sql
-- ══════════════════════════════════════════════════════

INSERT INTO products (name, slug, price, category, gender_tag, active, tag, description, images) VALUES

-- Men's shoes
('The Westminster Oxford',    'westminster-oxford',    895,  'oxford',  'men',          true, 'Signature', 'Our signature Oxford. Hand-lasted on a narrow London last with a chisel toe. Blake-stitched on a leather sole.', ARRAY['/images/categories/oxford.jpg']),
('The Mayfair Derby',         'mayfair-derby',         795,  'derby',   'men',          true, 'Bestseller','A open-lacing Derby on a slightly rounded last. Versatile, elegant, built for daily wear.', ARRAY['/images/categories/derby.jpg']),
('The Chelsea Boot',          'chelsea-boot',          945,  'boot',    'men',          true, 'New',       'A clean, architectural Chelsea on a block heel. Elastic gussets in matching leather.', ARRAY['/images/categories/boot.jpg']),
('The Belgravia Brogue',      'belgravia-brogue',      855,  'brogue',  'men',          true, null,        'Full-brogue detailing on our Oxford last. Punched and pinked by hand.', ARRAY['/images/categories/oxford.jpg']),
('The Knightsbridge Loafer',  'knightsbridge-loafer',  775,  'loafer',  'men',          true, 'New',       'A slip-on penny loafer with a leather-wrapped penny bar and leather lining.', ARRAY['/images/categories/loafer.jpg']),
('The Regent Monk',           'regent-monk',           825,  'monk',    'men',          true, null,        'Double monk-strap on a squared toe last. Solid brass buckles. A statement of intent.', ARRAY['/images/categories/monkstrap.jpg']),
('The Savile Sneaker',        'savile-sneaker',        645,  'sneaker', 'men',          true, 'Limited',   'A luxury sneaker construction with a Blake-stitched rubber cupsole. Italian nappa upper.', ARRAY['/images/categories/sneaker.jpg']),
('The Kensington Slipper',    'kensington-slipper',    595,  'loafer',  'men',          true, null,        'A velvet-lined evening slipper with hand-painted edges and grosgrain bow.', ARRAY['/images/categories/slipper.jpg']),

-- Women's shoes
('The Sloane Heel',           'sloane-heel',           895,  'heel',    'women',        true, 'New',       'A 80mm block heel in full-grain calfskin. Padded insole, leather-covered heel block.', ARRAY['/images/categories/highheel.jpg']),
('The Belgravia Flat',        'belgravia-flat',        645,  'flat',    'women',        true, null,        'A pointed-toe ballet flat with a featherweight leather sole. Devastatingly simple.', ARRAY['/images/categories/loafer.jpg']),
('The Mayfair Pump',          'mayfair-pump',          825,  'pump',    'women',        true, 'Signature', 'A 65mm stiletto pump on our London women\'s last. Hand-welted, hand-finished.', ARRAY['/images/categories/highheel.jpg']),
('The Chelsea Women\'s Boot', 'chelsea-women-boot',    875,  'boot',    'women',        true, 'New',       'Our Chelsea in a women\'s proportioned last with a 35mm block heel.', ARRAY['/images/categories/boot.jpg']),

-- Bags
('The Parliament Briefcase',  'parliament-briefcase',  1450, 'briefcase','bags',        true, 'Signature', 'A structured two-compartment briefcase in full-grain leather. Solid brass locks.', ARRAY['/images/categories/bag.jpg']),
('The Knightsbridge Holdall', 'knightsbridge-holdall', 1295, 'holdall', 'bags',         true, null,        'A weekend holdall that works as hard on Monday as it does on Friday.', ARRAY['/images/categories/bag.jpg']),
('The Mayfair Tote',          'mayfair-tote',          895,  'tote',    'bags',         true, 'New',       'An open-top tote with a canvas interior and leather base. Everyday utility, luxury feel.', ARRAY['/images/categories/bag.jpg']),

-- Belts
('The Savile Belt 35mm',      'savile-belt-35',        285,  '35mm',    'belts',        true, null,        'Full-grain leather belt on a solid brass single-prong buckle. Edges hand-burnished.', ARRAY['/images/categories/accessories.jpg']),
('The Regent Belt 40mm',      'regent-belt-40',        295,  '40mm',    'belts',        true, 'Bestseller','A wider 40mm dress belt for the gentleman who commands a room.', ARRAY['/images/categories/accessories.jpg']),

-- Leather goods
('The Westminster Wallet',    'westminster-wallet',    295,  'wallet',  'leather-goods',true, null,        'A slim six-card wallet in full-grain leather. No-fuss, no bulk.', ARRAY['/images/categories/accessories.jpg']),
('The Mayfair Card Holder',   'mayfair-card-holder',   195,  'card-holder','leather-goods',true,'New',    'A flat four-card holder that slips into any pocket without a trace.', ARRAY['/images/categories/accessories.jpg']);

-- Update timestamps
UPDATE products SET updated_at = NOW() WHERE updated_at IS NULL;

SELECT COUNT(*) as "Products seeded" FROM products;
