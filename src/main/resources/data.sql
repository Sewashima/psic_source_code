-- CREATE DATABASE hms IF NOT EXISTS;
INSERT INTO physicians (title, first_name, last_name, address, phone_number, expertise, consultation_time, created_at, updated_at) VALUES
  ('Mr', 'Physician', 'First', 'Lagos State, Nigeria', '08130167617', 'PHYSIOTHERAPY', 'Monday', '2021-03-01', '2021-03-01'),
  ('Mrs', 'Sade', 'Ridwan', 'Lagos State, Nigeria', '08130167617', 'PHYSIOTHERAPY', 'Tuesday', '2021-03-01', '2021-03-01'),
  ('Mr', 'John', 'Sam', 'Lagos State, Nigeria', '08130167617', 'OSTEOPATHY', 'Wednesday', '2021-03-01', '2021-03-01'),
  ('Mrs', 'Sam', 'Alladyce', 'Lagos State, Nigeria', '08130167617', 'PHYSIOTHERAPY', 'Thursday', '2021-03-01', '2021-03-01'),
  ('Mr', 'Johnson', 'Fergie', 'Lagos State, Nigeria', '08130167617', 'REHABILITATION', 'Friday', '2021-03-01', '2021-03-01');

INSERT INTO patients (title, first_name, last_name, age, phone_number, address) VALUES
    ('Mr.', 'Patient', 'Tunde', 24, '08130167617', 'Lagos, Nigeria'),
    ('Mrs.', 'Sam', 'Alladyce', 20, '08130167617', 'Lagos, Nigeria'),
    ('Mr.', 'Sir', 'Alex', 22, '08130167617', 'Lagos, Nigeria'),
    ('Mr.', 'Segun', 'Jones', 24, '08130167617', 'Lagos, Nigeria'),
    ('Mr.', 'Alex', 'Ferguson', 24, '08130167617', 'Lagos, Nigeria'),
    ('Mr.', 'John', 'Muller', 24, '08130167617', 'Lagos, Nigeria'),
    ('Mr.', 'Kola', 'Lekan', 24, '08130167617', 'Lagos, Nigeria'),
    ('Mr.', 'Desmond', 'Elliot', 24, '08130167617', 'Lagos, Nigeria'),
    ('Mrs.', 'Java', 'Man', 24, '08130167617', 'Lagos, Nigeria'),
    ('Mr.', 'Thank', 'You', 24, '08130167617', 'Lagos, Nigeria'),
    ('Mr.', 'Okorocha', 'Nwaulu', 24, '08130167617', 'Lagos, Nigeria'),
    ('Mr.', 'John', 'Solomon', 24, '08130167617', 'Lagos, Nigeria'),
    ('Mr.', 'Hassan', 'Balewa', 24, '08130167617', 'Lagos, Nigeria'),

    ('Mr.', 'Tolu', 'Fit', 24, '08130167617', 'Lagos, Nigeria'),
    ('Mr.', 'James', 'Bond', 24, '08130167617', 'Lagos, Nigeria');

INSERT INTO appointments (patient_id, physician_id, treatment_type_id, reason, time, room, note, status) VALUES
   ( 1, 1, 1, 'PHYSIOTHERAPY', '1PM Sunday', 'A Suites', 'See you then', 'cancelled'),
   ( 2, 2, 2, 'OSTEOPATHY', '3PM Monday', 'B Suites', 'See you then', 'open'),
   ( 3, 3, 1, 'REHABILITATION', '6PM Tuesday', 'C Suites', '', 'attended');

INSERT INTO treatment_types (name) VALUES
   ( 'Neural mobilisation' ), ( 'Acupuncture' ), ( 'Massage' ),
   ( 'Mobilisation of the spine and joints' ), ( 'Pool rehabilitation' );

INSERT INTO consultation_times (physician_id, time) VALUES
   ( 1, '2PM Monday' ),
   ( 1, '3PM Wednessday' ),
   ( 2, '12PM Tuesday' ),
   ( 2, '5PM Thursday' ),
   ( 3, '6PM Saturday' ),
   ( 3, '8PM Tuesday' ),
   ( 4, '2PM Sunday' ),
   ( 5, '1PM Sunday' );

INSERT INTO rooms (name) VALUES
( 'A Suites' ), ( 'B Suites' ), ( 'C Suites' ), ( 'Swimming pool' ), ( 'Gym' );

INSERT INTO physician_rooms (physician_id, room_id) VALUES
( 1, 1 ), ( 1, 2 ), ( 2, 1 ), ( 3, 3 ), ( 4, 4);

