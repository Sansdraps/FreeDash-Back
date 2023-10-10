BEGIN;
	
-- On s'assure que les tables soient supprimées avant d'être créées afin d'éviter tout problème

DROP TABLE IF EXISTS "mission_details" CASCADE;
DROP TABLE IF EXISTS "mission" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "client" CASCADE;


-- ===================================

-- CREATION DES TABLES

-- ===================================

-- -----------------------------------
-- Table "user"
-- -----------------------------------

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "email" VARCHAR(64) NOT NULL,
  "firstname" VARCHAR(64) NOT NULL,
  "lastname" VARCHAR(64) NOT NULL,
  "password" VARCHAR(64) NOT NULL,
  "address" VARCHAR(255),
  "city" VARCHAR(255),
  "zip_code" INT,
  "country" VARCHAR(64),
  "occupation" VARCHAR(64),
  "phone_number" VARCHAR(64),
  "role" VARCHAR(64),
  "photo_url" VARCHAR(255),
  "siret" BIGINT,
  "iban" VARCHAR(64),
  "bic" VARCHAR(64),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);


-- -----------------------------------
-- Table "client"
-- -----------------------------------

CREATE TABLE "client" (
  "id" SERIAL NOT NULL,
  "email" VARCHAR(64),
  "firstname" VARCHAR(64),
  "lastname" VARCHAR(64),
  "address" VARCHAR(255),
  "zip_code" INT,
  "city" VARCHAR(255),
  "country" VARCHAR(64),
  "phone_number" VARCHAR(64),
  "role" VARCHAR(64),
  "siret" BIGINT,
  "photo_url" VARCHAR(255),
  "provenance" VARCHAR(64),
  "commentary" TEXT,
  "user_id" INT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  PRIMARY KEY(id, firstname, lastname),
  FOREIGN KEY (user_id) REFERENCES "user" (id)
);


-- -----------------------------------
-- Table "mission"
-- -----------------------------------

CREATE TABLE "mission" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(64),
  "start_date" DATE,
  "end_date" DATE,
  "status" VARCHAR(64),
  "total_price" DECIMAL(10, 2),
  "tva" DECIMAL(10, 2),
  "commentary" TEXT,
  "declarate" BOOLEAN,
  "user_id" INT,
  "client_id" INT,
  "client_firstname" VARCHAR(64),
  "client_lastname" VARCHAR(64),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  FOREIGN KEY (user_id) REFERENCES "user"(id)
);

SELECT client.id, client.firstname, client.lastname
FROM client
JOIN mission ON mission.client_id = client.id
WHERE mission.client_firstname = client.firstname
AND mission.client_lastname = client.lastname;
-- -----------------------------------
-- Table "mission_details"
-- -----------------------------------

CREATE TABLE "mission_details" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "description" VARCHAR(255),
  "quantity" INT,
  "price" DECIMAL(10, 2),
  "mission_id" INT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  FOREIGN KEY (mission_id) REFERENCES "mission" (id)
);


COMMIT;
