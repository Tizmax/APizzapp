INSERT INTO price_ranges (id, name) 
VALUES
  (0, 'Cheap'),
  (1, 'Normal'),
  (2, 'Géchar');

INSERT INTO pizzas (name, price_range_id, image_url)
VALUES 
  ('Marguerite', 0, 'images/pizzas/margherite.webp'),
  ('Anchois', 0, 'images/pizzas/4saisons.webp'),
  ('Napolitaine', 0, 'images/pizzas/napoli.webp'),
  ('Jambonnière', 0, 'images/pizzas/jambonniere.webp'),
  ('Forestière', 0, 'images/pizzas/bufalina.webp'),
  ('Reine', 0, 'images/pizzas/reine.webp'),
  ('Oignons', 0, 'images/pizzas/lorenza.webp'),
  ('Knacki', 0, 'images/pizzas/pistachio.webp'),
  ('Chorizo', 1, 'images/pizzas/arrivederci.webp'),
  ('Thon et Câpres', 1, 'images/pizzas/traditional.webp'),
  ('Bolognaise', 1, 'images/pizzas/gasconne.webp'),
  ('Carbonara', 1, 'images/pizzas/estella.webp'),
  ('Chausson', 2, 'images/pizzas/napoli.webp'),
  ('Figatellu', 2, 'images/pizzas/proscuitto.webp'),
  ('Fruits de mer', 2, 'images/pizzas/salmone.webp'),
  ('Kebab', 2, 'images/pizzas/gasconne.webp'),
  ('Roquefort', 2, 'images/pizzas/mielina.webp'),
  ('3 Fromages', 2, 'images/pizzas/3fromages.webp'),
  ('Poivrons et Lardons', 2, 'images/pizzas/arrivederci.webp'),
  ('4 Saisons', 2, 'images/pizzas/4saisons.webp'),
  ('Pizza du chef', 2, 'images/pizzas/pistachio.webp'),
  ('Pizza de Sophie', 2, 'images/pizzas/estella.webp');