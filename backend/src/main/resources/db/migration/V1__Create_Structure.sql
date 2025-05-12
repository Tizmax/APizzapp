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

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'USER'
);