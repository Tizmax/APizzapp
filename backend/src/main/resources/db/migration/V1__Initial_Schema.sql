CREATE TABLE ingredients (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    available_as_supplement BOOLEAN NOT NULL DEFAULT true,
    supplement_price DECIMAL(10, 2),
    image_url VARCHAR(255)
);
