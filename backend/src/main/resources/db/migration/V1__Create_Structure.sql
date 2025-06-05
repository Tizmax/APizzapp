CREATE TABLE pizzas (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description VARCHAR(255),
  price NUMERIC(10, 2) NOT NULL,
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

-- Ajout de tous les champs (sinon impossible d'ajouter des données ensuite)
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
    pizza_id BIGINT NOT NULL,
    CONSTRAINT fk_order_items_pizza FOREIGN KEY (pizza_id) REFERENCES pizzas(id),
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Table de jointure pour les suppléments
CREATE TABLE supplements (
    item_id BIGINT NOT NULL,
    ingredient_id BIGINT NOT NULL,
    PRIMARY KEY (item_id, ingredient_id),
    CONSTRAINT fk_supplements_item FOREIGN KEY (item_id) REFERENCES order_items(id),
    CONSTRAINT fk_supplements_ingredient FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

-- Table de jointure pour les dépléments
CREATE TABLE deplements (
    item_id BIGINT NOT NULL,
    ingredient_id BIGINT NOT NULL,
    PRIMARY KEY (item_id, ingredient_id),
    CONSTRAINT fk_deplements_item FOREIGN KEY (item_id) REFERENCES order_items(id),
    CONSTRAINT fk_deplements_ingredient FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);
