CREATE TABLE sauces (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  image_url VARCHAR(255)
);

-- Les Gammes de Prix
CREATE TABLE price_ranges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE pizzas (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  price_range_id INT REFERENCES price_ranges(id),
  image_url VARCHAR(255)
);

CREATE TABLE ingredients (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  available_as_supplement BOOLEAN NOT NULL DEFAULT TRUE,
  supplement_price NUMERIC(10, 2),
  image_url VARCHAR(255)
);

CREATE TABLE pizza_base_ingredients (
  pizza_id BIGINT NOT NULL,
  ingredient_id BIGINT NOT NULL,
  PRIMARY KEY (pizza_id, ingredient_id),
  FOREIGN KEY (pizza_id) REFERENCES pizzas(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(120) NOT NULL,
  first_name VARCHAR(50), 
  last_name VARCHAR(50), 
  role VARCHAR(20) NOT NULL DEFAULT 'ROLE_USER'
);

CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    scheduled_time VARCHAR(10) NOT NULL,
    first_name_guest VARCHAR(50),
    last_name_guest VARCHAR(50),
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    total_amount DECIMAL(10, 2) NOT NULL,
    user_id BIGINT,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE order_items ( 
    id SERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    half1_id BIGINT,
    half2_id BIGINT,
    size_id INT,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE modified_pizzas ( 
    id SERIAL PRIMARY KEY,
    order_item_id BIGINT NOT NULL,
    pizza_id BIGINT NOT NULL,
    sauce_id BIGINT REFERENCES sauces(id),
    CONSTRAINT fk_modified_pizzas_pizza FOREIGN KEY (pizza_id) REFERENCES pizzas(id),
    CONSTRAINT fk_modified_pizzas_order_item FOREIGN KEY (order_item_id) REFERENCES order_items(id)
);

-- Table de jointure pour les suppléments
CREATE TABLE supplements (
    modified_pizza_id BIGINT NOT NULL,
    ingredient_id BIGINT NOT NULL,
    PRIMARY KEY (modified_pizza_id, ingredient_id),
    CONSTRAINT fk_supplements_modified_pizza FOREIGN KEY (modified_pizza_id) REFERENCES modified_pizzas(id),
    CONSTRAINT fk_supplements_ingredient FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

-- Table de jointure pour les dépléments
CREATE TABLE deplements (
    modified_pizza_id BIGINT NOT NULL,
    ingredient_id BIGINT NOT NULL,
    PRIMARY KEY (modified_pizza_id, ingredient_id),
    CONSTRAINT fk_deplements_modified_pizza FOREIGN KEY (modified_pizza_id) REFERENCES modified_pizzas(id),
    CONSTRAINT fk_deplements_ingredient FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

-- Les Tailles (P, M, G)
CREATE TABLE pizza_sizes (
    id SERIAL PRIMARY KEY,
    label VARCHAR(10) NOT NULL -- 'P', 'M', 'G'
);

-- Correspondance Gamme de Prix <-> Taille <-> Prix
CREATE TABLE pizza_range_prices (
    price_range_id INT REFERENCES price_ranges(id),
    size_id INT REFERENCES pizza_sizes(id),
    price NUMERIC(10, 2) NOT NULL,
    PRIMARY KEY (price_range_id, size_id)
);

-- Correspondance supplément <-> Taille <-> Prix
-- CREATE TABLE ingredient_prices_by_size (
--     ingredient_id BIGINT REFERENCES ingredients(id),
--     size_id INT REFERENCES pizza_sizes(id),
--     price NUMERIC(10, 2) NOT NULL,
--     PRIMARY KEY (ingredient_id, size_id)
-- );