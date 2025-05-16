INSERT INTO users (email, password, first_name, last_name, role)
VALUES 
    ('john.doe@example.com', 'password123', 'John', 'Doe', 'ROLE_USER'),
    ('jane.smith@example.com', 'mypassword', 'Jane', 'Smith', 'ROLE_USER'),
    ('admin.user@example.com', 'adminpass', 'Admin', 'User', 'ROLE_ADMIN');

INSERT INTO orders (order_date, status, total_amount, user_id)
VALUES 
    (NOW(), 'PENDING', 27.97, 1), -- Commande de John Doe
    (NOW(), 'PAID', 18.48, 2), -- Commande de Jane Smith
    (NOW(), 'PENDING', 21.98, 1); -- Deuxième commande de John Doe

-- Commande 1
INSERT INTO order_items (order_id, name, base_price, image_url)
VALUES 
    (1, 'Margherita', 7.99, 'img/margherita.jpg'),
    (1, 'Pepperoni', 9.49, 'img/pepperoni.jpg');

-- Commande 2
INSERT INTO order_items (order_id, name, base_price, image_url)
VALUES 
    (2, 'Végétarienne', 8.99, 'img/vegetarienne.jpg'),
    (2, 'Hawaïenne', 9.29, 'img/hawaienne.jpg');

-- Commande 3
INSERT INTO order_items (order_id, name, base_price, image_url)
VALUES 
    (3, 'Quatre Fromages', 10.99, 'img/quatrefromages.jpg'),
    (3, 'Quatre Fromages', 10.99, 'img/quatrefromages.jpg');
