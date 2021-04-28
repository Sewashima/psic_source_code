-- CREATE DATABASE hms IF NOT EXISTS;
INSERT INTO physicians (title, first_name, last_name, address, phone_number, consultation_time, created_at, updated_at) VALUES
  ('Mr', 'Physician', 'First', 'Lagos State, Nigeria', '08130167617', 'Monday', '2021-03-01', '2021-03-01'),
  ('Mrs', 'Sade', 'Ridwan', 'Lagos State, Nigeria', '08130167617', 'Tuesday', '2021-03-01', '2021-03-01'),
  ('Mr', 'John', 'Sam', 'Lagos State, Nigeria', '08130167617', 'Wednesday', '2021-03-01', '2021-03-01'),
  ('Mrs', 'Sam', 'Alladyce', 'Lagos State, Nigeria', '08130167617', 'Thursday', '2021-03-01', '2021-03-01'),
  ('Mr', 'Johnson', 'Fergie', 'Lagos State, Nigeria', '08130167617', 'Friday', '2021-03-01', '2021-03-01');

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
   ( 1, 1, 1, 'PHYSIOTHERAPY', '2PM Monday 01-May-2021', 'A Suites', 'See you then', 'cancelled'),
   ( 2, 2, 2, 'OSTEOPATHY', '6PM Wednesday 01-May-2021', 'B Suites', 'See you then', 'open'),
   ( 3, 3, 1, 'REHABILITATION', '7PM Friday 01-May-2021', 'C Suites', '', 'attended');

INSERT INTO visitor_appointments (physician_id, treatment_type_id, first_name, last_name, reason, time, room, note, status) VALUES
   ( 1, 1, 'Tobs', 'Bola', 'PHYSIOTHERAPY', '12PM Saturday 01-May-2021', 'A Suites', 'See you then', 'cancelled'),
   ( 2, 2, 'Ise', 'Isegun', 'OSTEOPATHY', '2PM Sunday 01-May-2021', 'B Suites', 'See you then', 'open');

INSERT INTO treatment_types (name) VALUES
   ( 'Neural mobilisation' ), ( 'Acupuncture' ), ( 'Massage' ),
   ( 'Mobilisation of the spine and joints' ), ( 'Pool rehabilitation' );

INSERT INTO consultation_times (physician_id, time) VALUES
   ( 1, '2PM Monday 01-May-2021' ),
   ( 1, '3PM Wednesday 03-May-2021' ),
   ( 1, '2PM Monday 08-May-2021' ),
   ( 1, '3PM Wednesday 10-May-2021' ),
   ( 1, '2PM Monday 15-May-2021' ),
   ( 1, '3PM Wednesday 18-May-2021' ),
   ( 1, '2PM Monday 24-May-2021' ),
   ( 1, '3PM Wednesday 27-May-2021' ),
                                             
   ( 2, '1PM Monday 02-May-2021' ),
   ( 2, '2PM Wednesday 04-May-2021' ),
   ( 2, '1PM Monday 09-May-2021' ),
   ( 2, '2PM Wednesday 10-May-2021' ),
   ( 2, '1PM Monday 17-May-2021' ),
   ( 2, '2PM Wednesday 18-May-2021' ),
   ( 2, '1PM Monday 25-May-2021' ),
   ( 2, '5PM Wednesday 27-May-2021' ),
                                             
   ( 3, '5PM Monday 01-May-2021' ),
   ( 3, '6PM Wednesday 03-May-2021' ),
   ( 3, '3PM Monday 08-May-2021' ),
   ( 3, '6PM Wednesday 10-May-2021' ),
   ( 3, '8PM Monday 15-May-2021' ),
   ( 3, '9PM Wednesday 18-May-2021' ),
   ( 3, '1PM Monday 24-May-2021' ),
   ( 3, '2PM Wednesday 27-May-2021' ),
                                             
   ( 4, '2PM Monday 01-May-2021' ),
   ( 4, '6PM Wednesday 03-May-2021' ),
   ( 4, '7PM Monday 08-May-2021' ),
   ( 4, '8PM Wednesday 10-May-2021' ),
   ( 4, '9PM Monday 15-May-2021' ),
   ( 4, '10PM Wednesday 18-May-2021' ),
   ( 4, '11PM Monday 24-May-2021' ),
   ( 4, '12PM Wednesday 27-May-2021' ),
                                             
   ( 5, '1PM Monday 01-May-2021' ),
   ( 5, '3PM Wednesday 03-May-2021' ),
   ( 5, '2PM Monday 08-May-2021' ),
   ( 5, '3PM Wednesday 10-May-2021' ),
   ( 5, '5PM Monday 15-May-2021' ),
   ( 5, '6PM Wednesday 18-May-2021' ),
   ( 5, '7PM Monday 24-May-2021' ),
   ( 5, '8PM Wednesday 27-May-2021' );
                                  
INSERT INTO rooms (name) VALUES
( 'Consulting Suites A' ), ( 'Consulting Suites B' ), ( 'Consulting Suites C' ), ( 'Swimming pool' ), ( 'Gym' );

INSERT INTO physician_rooms (physician_id, room_id) VALUES
( 1, 1 ), ( 1, 2 ), ( 2, 1 ), ( 3, 3 ), ( 4, 4);

INSERT INTO expertise (id, name) VALUES
( 1, 'Physiotherapy' ), ( 2, 'Osteopathy' ), ( 3, 'Rehabilitation' );

INSERT INTO physician_expertise (physician_id, expertise_id) VALUES
( 1, 1 ), ( 1, 2 ), ( 1, 3 ), ( 2, 2 ), ( 2, 3 ), ( 3, 1), ( 3, 4), ( 4, 3), ( 5, 1);