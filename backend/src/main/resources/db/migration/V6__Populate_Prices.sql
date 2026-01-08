
INSERT INTO pizza_sizes (id, label)
VALUES
  (0, 'P'),
  (1, 'M'),
  (2, 'G');

INSERT INTO pizza_range_prices (price_range_id, size_id, price)
VALUES
  (0, 0, 6.5),  -- Petite Cheap
  (0, 1, 8.5), -- Moyenne Cheap
  (0, 2, 11.5), -- Grande Cheap
  (1, 0, 7.0),  -- Petite Normal
  (1, 1, 9.0), -- Moyenne Normal
  (1, 2, 12.0), -- Grande Normal
  (2, 0, 7.5), -- Petite G�char
  (2, 1, 10.0), -- Moyenne G�char
  (2, 2, 13.0); -- Grande G�char

INSERT INTO supplement_range_prices (supplement_price_range_id, size_id, price)
VALUES
  (0, 0, 1.0), -- Petite Standard
  (0, 1, 1.5), -- Moyenne Standard
  (0, 2, 2.0), -- Grande Standard
  (1, 0, 1.5), -- Petite Unique
  (1, 1, 1.5), -- Moyenne Unique
  (1, 2, 1.5); -- Grande Unique

