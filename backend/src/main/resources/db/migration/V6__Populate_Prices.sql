
INSERT INTO pizza_sizes (id, label)
VALUES
  (0, 'P'),
  (1, 'M'),
  (2, 'G');

INSERT INTO pizza_range_prices (price_range_id, size_id, price)
VALUES
  (0, 0, 8.5),  -- Petite Cheap
  (0, 1, 10.0), -- Moyenne Cheap
  (0, 2, 12.0), -- Grande Cheap
  (1, 0, 9.0),  -- Petite Normal
  (1, 1, 11.0), -- Moyenne Normal
  (1, 2, 13.0), -- Grande Normal
  (2, 0, 10.0), -- Petite Géchar
  (2, 1, 12.0), -- Moyenne Géchar
  (2, 2, 14.0); -- Grande Géchar