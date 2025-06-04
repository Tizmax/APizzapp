CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (email, password, first_name, last_name, role) VALUES
  (
    'User@email.com',
    crypt('user', gen_salt('bf')),
    'User',
    'U',
    'ROLE_USER'
  ),
  (
    'Operateur@email.com',
    crypt('operateur', gen_salt('bf')),
    'Operateur',
    'O',
    'ROLE_OPERATOR'
  ),
  (
    'Admin@email.com',
    crypt('admin', gen_salt('bf')),
    'Admin',
    'A',
    'ROLE_ADMIN'
  ),
  (
    'bob.user@example.com',
    crypt('user', gen_salt('bf')),
    'BOB',
    'User',
    'ROLE_USER'
  ),
  (
    'sandrine.bernardini@gmail.com',
    crypt('sandrine', gen_salt('bf')),
    'Sandrine',
    'Bernardini',
    'ROLE_OPERATOR'
  ),
  (
    'matthis.bernardini@gmail.com',
    crypt('matthis!', gen_salt('bf')),
    'Matthis',
    'Bernardini',
    'ROLE_ADMIN'
  ),
  (
    'enzobaita@yahoo.com',
    crypt('pizza!', gen_salt('bf')),
    'Enzo',
    'Baita',
    'ROLE_ADMIN'
  );