-- CREATE DATABASE hms IF NOT EXISTS;

INSERT INTO physicians (title, first_name, last_name, address, phone_number, expertise, consultation_time, created_at, updated_at) VALUES
  ('Mr', 'Tobi', 'Bola', 'Lagos State, Nigeria', '08130167617', 'PHYSIOTHERAPY', 'Monday', '2021-03-01', '2021-03-01'),
  ('Mrs', 'Sade', 'Ridwan', 'Lagos State, Nigeria', '08130167617', 'PHYSIOTHERAPY', 'Tuesday', '2021-03-01', '2021-03-01'),
  ('Mr', 'John', 'Sam', 'Lagos State, Nigeria', '08130167617', 'OSTEOPATHY', 'Wednesday', '2021-03-01', '2021-03-01'),
  ('Mrs', 'Sam', 'Alladyce', 'Lagos State, Nigeria', '08130167617', 'PHYSIOTHERAPY', 'Thursday', '2021-03-01', '2021-03-01'),
  ('Mr', 'Johnson', 'Fergie', 'Lagos State, Nigeria', '08130167617', 'REHABILITATION', 'Friday', '2021-03-01', '2021-03-01');

INSERT INTO patients (first_name, last_name, age, phone_number, address) VALUES
    ('Wallet', 'Check', 24, '08130167617', 'Lagos, Nigeria'),
    ('Sam', 'Alladyce', 20, '08130167617', 'Lagos, Nigeria'),
    ('Sir', 'Alex', 22, '08130167617', 'Lagos, Nigeria'),
    ('Segun', 'Jones', 24, '08130167617', 'Lagos, Nigeria'),
    ('Alex', 'Ferguson', 24, '08130167617', 'Lagos, Nigeria'),
    ('John', 'Muller', 24, '08130167617', 'Lagos, Nigeria'),
    ('Kola', 'Lekan', 24, '08130167617', 'Lagos, Nigeria'),
    ('Desmond', 'Elliot', 24, '08130167617', 'Lagos, Nigeria'),
    ('Java', 'Man', 24, '08130167617', 'Lagos, Nigeria'),
    ('Thank', 'You', 24, '08130167617', 'Lagos, Nigeria'),
    ('Okorocha', 'Nwaulu', 24, '08130167617', 'Lagos, Nigeria'),
    ('John', 'Solomon', 24, '08130167617', 'Lagos, Nigeria'),
    ('Hassan', 'Balewa', 24, '08130167617', 'Lagos, Nigeria'),

    ('Tolu', 'Fit', 24, '08130167617', 'Lagos, Nigeria'),
    ('James', 'Bond', 24, '08130167617', 'Lagos, Nigeria');

INSERT INTO appointments (patient_id, physician_id, treatment_type_id, time, room, note) VALUES
   ( 1, 1, 1, '2021-03-01 22:10:01', 'A Suites', 'See you then'),
   ( 1, 2, 2, '2021-02-01 22:10:01', 'B Suites', 'See you then');

INSERT INTO treatment_types (name) VALUES
   ( 'Neural mobilisation' ), ( 'Acupuncture' ), ( 'Massage' ),
   ( 'Mobilisation of the spine and joints' ), ( 'Pool rehabilitation' )