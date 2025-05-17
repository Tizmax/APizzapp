

INSERT INTO orders (order_date, status, total_amount, user_id)
VALUES 
    (NOW(), 'PENDING', 27.97, 1), -- Commande de John Doe
    (NOW(), 'PAID', 18.48, 2), -- Commande de Jane Smith
    (NOW(), 'PENDING', 21.98, 1); -- Deuxième commande de John Doe

-- Commande 1
INSERT INTO order_items (order_id, pizza_id)
VALUES 
    (1, 1),
    (1, 2),
    (2, 3),
    (2, 4),
    (3, 5),
    (3, 6);

INSERT INTO supplements (item_id, ingredient_id)
VALUES 
    (1, 1), 
    (2, 2),
    (3, 3),
    (4, 4), 
    (5, 5), 
    (6, 6);

INSERT INTO deplements (item_id, ingredient_id)
VALUES 
    (1, 7), 
    (2, 8),
    (3, 9),
    (4, 10), 
    (5, 11), 
    (6, 12);
