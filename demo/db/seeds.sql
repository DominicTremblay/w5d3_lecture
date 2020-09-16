INSERT INTO movies(title, description, released_date, runtime_in_minutes) 
VALUES 
  ('Tenet','Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.','2020-09-03',150),
  ('Dunkirk', 'Allied soldiers from Belgium, the British Empire, and France are surrounded by the German Army and evacuated during a fierce battle in World War II.', '2017-07-21', 106),
  ('Interstellar','A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival.', '2014-11-07', 169),
  ('Deadpool 2','Foul-mouthed mutant mercenary Wade Wilson (a.k.a. Deadpool), brings together a team of fellow mutant rogues to protect a young boy with supernatural abilities from the brutal, time-traveling cyborg Cable.', '2018-05-18',119),
  ('Avengers: Endgame','After the devastating events of Avengers: Infinity War (2018), the universe is in ruins.','2019-04-26',181);

INSERT INTO actors(first_name, last_name, bio, dob)
VALUES
  ('John David','Washington','John David Washington was born on July 28, 1984 in the USA. He is an actor and producer, known for BlacKkKlansman (2018), Tenet (2020) and The Book of Eli (2010).', '1984-07-28'),
  ('Robert','Pattinson','Robert Douglas Thomas Pattinson was born May 13, 1986 in London, England, to Richard Pattinson, a car dealer importing vintage cars, and Clare Pattinson (née Charlton), who worked as a booker at a model agency.', '1986-05-13'),
  ('Elizabeth','Debicki','Debicki was born in Paris, to a Polish father and an Australian mother of Irish descent, who were both dancers.','1990-08-24'),
  ('Fionn','Whitehead','From a family of Londoners, Fionn Whitehead was born and raised in Richmond Upon Thames, Surrey (South west of England and also one of the home counties bordering Greater London).',null),
  ('Barry','Keoghan','Barry came to prominence in the 2017 film ''The Killing of a Sacred Deer'' with his truly terrifying portrayal of Martin,an American teenager exacting a grisly revenge on drunken surgeon Colin Farrell','1992-10-17'),
  ('Mark','Rylance','Widely regarded as the greatest stage actor of his generation, Sir Mark Rylance has enjoyed an esteemed career on stage and on screen.','1960-01-29'),
  ('Matthew', 'McConaughey', 'American actor and producer Matthew David McConaughey was born in Uvalde, Texas. His mother, Mary Kathleen (McCabe), is a substitute school teacher originally from New Jersey.','1969-11-04'),
  ('Anne', 'Hathaway', 'Anne Jacqueline Hathaway was born in Brooklyn, New York, to Kate McCauley Hathaway, an actress, and Gerald T. Hathaway, a lawyer, both originally from Philadelphia.', '1982-11-02'),
  ('Jessica','Chastain','Jessica Michelle Chastain was born in Sacramento, California, and was raised in a middle-class household in a Northern California suburb.','1977-03-24'),
  ('Ryan','Reynolds','Ryan Rodney Reynolds was born on October 23, 1976 in Vancouver, British Columbia, Canada, the youngest of four children.','1976-10-23'),
  ('Morena','Baccarin','Morena Baccarin was born in Rio de Janeiro, Brazil, to actress Vera Setta and journalist Fernando Baccarin.', '1979-06-02'),
  ('Robert','Downey Jr.','Robert Downey Jr. has evolved into one of the most respected actors in Hollywood. With an amazing list of credits to his name, he has managed to stay new and fresh even after over four decades in the business.','1965-04-04'),
  ('Chris','Evans','Christopher Robert Evans began his acting career in typical fashion: performing in school productions and community theatre. He was born in Boston, Massachusetts, the son of Lisa (Capuano), who worked at the Concord Youth Theatre, and G. Robert Evans III, a dentist.','1981-06-13'),
  ('Mark','Ruffalo','Mark Ruffalo was born in Kenosha, Wisconsin, to Marie Rose (Hebert), a stylist and hairdresser, and Frank Lawrence Ruffalo, a construction painter.','1967-11-22');


INSERT INTO casting(movie_id, actor_id)
VALUES
  (1,1),
  (1,2),
  (1,3),
  (2,4),
  (2,5),
  (2,6),
  (3,7),
  (3,8),
  (3,9),
  (4,10),
  (4,11),
  (5,12),
  (5,13),
  (5,14);