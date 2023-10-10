BEGIN;


INSERT INTO "user" ("id", "email", "firstname", "lastname", "password", "city", "zip_code", "country", "occupation", "phone_number", "role", "photo_url", "siret", "iban", "bic")
VALUES (1, 'alex.ottmann@hotmail.fr', 'Alexandre', 'Ottmann', '1234', 'Paris', 75000, 'France', 'Sound Designer', '06 66 66 66 66', 'user', 'https://unsplash.com/fr/photos/j_yjULg-DOE', 84351374800015, 'FR76 2222 2222 2222 2222 2222 333', 'CMCIFR2A');


INSERT INTO client ("id", "email", "firstname", "lastname", "address", "zip_code", "city", "country", "phone_number", "role", "siret", "photo_url", "provenance", "commentary", "user_id")
VALUES 
(2, 'clement@gmail.com', 'Clément', 'Rollot', '8 rue de la paix', 75000, 'Paris', 'France', '06 66 66 66 66', 'non_user', 84351374800015, 'https://unsplash.com/fr/photos/j_yjULg-DOE', 'Malt', 'Clément est un joyeux compagnon de mission, il est robuste et cocasse.', 1),

(3,'sandra@gmail.com', 'Sandra', 'Draps', '8 rue de la haine', 75000, 'Paris', 'France', '06 61 66 66 66', 'non_user', 84351374800015, 'https://unsplash.com/fr/photos/j_yjULg-DOE', 'Contact Direct via ami', 'Sandra est très réactive et très react. N''hésite pas à apporter son soutien comme elle porte sa famille.', 1),

(4,'Laydi@gmail.com', 'Laydi', 'So', '8 rue de la terre du milieu', 75000, 'Paris', 'France', '06 60 66 66 66','non_user',84351374200015, 'https://unsplash.com/fr/photos/j_yjULg-DOE', 'LinkedIn', 'Laydi est là et il le fait savoir, il pèse dans le game du back et crée des routes comme ses chocolat.. Pains au choc du matin.', 1);
  

INSERT INTO mission ("id", "name", "start_date", "end_date", "status", "total_price", "tva", "commentary", "declarate", "user_id") 
VALUES (1,'O''clock', '2023-05-08','2023-05-10','En Cours','50.5','20','Production d''un podcast sur la reconversion, 3 personnes en interview, 40 minutes.', FALSE, 1),

(2,'O''clock', '2023-04-15', '2023-04-25', 'Terminée', '50.5', '20', 'Production d''un podcast sur la reconversion, 3 personnes en interview, 40 minutes.', FALSE, 1),

(4466644, 'O''clock', '2023-03-12', '2023-03-16', 'Terminée', '50.5', '20', 'Production d''un podcast sur la reconversion, 3 personnes en interview, 40 minutes.', FALSE, 1);


INSERT INTO mission_details ("description", "quantity", "price")
VALUES('Mix de 4 épisodes, multipiste 3 voix de 40 minutes', 4, 150),
  
('Composition d''un jingle', 1, 500);


COMMIT;
