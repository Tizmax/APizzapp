INSERT INTO supplement_price_ranges (id, name) 
VALUES 
  (0, 'Standard'),
  (1, 'Unique');

INSERT INTO ingredients (name, available_as_supplement, supplement_price_range_id, image_url)
VALUES 
  ('Gruyère', TRUE, 0, 'images/ingredients/cheese.jpg'),
  ('Mozzarella', TRUE, 0, 'images/ingredients/mozarella.jpg'),
  ('Olives', TRUE, 1, 'images/ingredients/olives.jpg'),
  ('Anchois', TRUE, 0, 'images/ingredients/anchois.jpg'),
  ('Jambon', TRUE, 0, 'images/ingredients/jambon.jpg'),
  ('Champignons', TRUE, 0, 'images/ingredients/champignons.jpg'),
  ('Oignons', TRUE, 0, 'images/ingredients/oignons.jpg'),
  ('Knacky', TRUE, 0, 'images/ingredients/knacky.jpg'),
  ('Chorizo', TRUE, 0, 'images/ingredients/chorizo.jpg'),
  ('Thon', TRUE, 0, 'images/ingredients/thon.jpg'),
  ('Câpres', TRUE, 0, 'images/ingredients/capres.jpg'),
  ('Bolognaise', TRUE, 0, 'images/ingredients/bolognaise.jpg'),
  ('Lardons', TRUE, 0, 'images/ingredients/lardons.jpg'),
  ('Oeuf', TRUE, 1, 'images/ingredients/oeuf.jpg'),
  ('Figatellu', TRUE, 0, 'images/ingredients/figatellu.jpg'),
  ('Fruits de mer', TRUE, 0, 'images/ingredients/fruits_de_mer.jpg'),
  ('Kebab', TRUE, 0, 'images/ingredients/kebab.jpg'),
  ('Roquefort', TRUE, 0, 'images/ingredients/roquefort.jpg'),
  ('Chèvre', TRUE, 0, 'images/ingredients/chevre.jpg'),
  ('Poivrons', TRUE, 0, 'images/ingredients/poivrons.jpg'),
  ('Coeurs d''artichaut', TRUE, 0, 'images/ingredients/artichaut.jpg'),
  ('Aubergine', TRUE, 0, 'images/ingredients/aubergine.jpg'),
  ('Miel', TRUE, 0, 'images/ingredients/miel.jpg'),
  ('Pignons', TRUE, 0, 'images/ingredients/pignons.jpg');
