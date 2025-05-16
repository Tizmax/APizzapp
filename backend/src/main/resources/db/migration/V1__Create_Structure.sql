CREATE TABLE pizzas (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description VARCHAR(255),
  base_price NUMERIC(10, 2) NOT NULL,
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
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    total_amount DECIMAL(10, 2) NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    base_price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    CONSTRAINT fk_order
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);