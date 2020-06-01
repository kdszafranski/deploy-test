CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(200) NOT NULL, 
	"date" DATE,
	"status" VARCHAR(50)
);

INSERT INTO "tasks" ("task", "date", "status")
VALUES ('Mow the lawn.', '5-31-20', 'Incomplete');
INSERT INTO "tasks" ("task", "date", "status")
VALUES ('Trim the fenceline.', '5-31-20', 'Incomplete');
INSERT INTO "tasks" ("task", "date", "status")
VALUES ('Sweep sidewalks', '5-31-20', 'Incomplete');
INSERT INTO "tasks" ("task", "date", "status")
VALUES ('Complete to-do app.', '5-31-20', 'Incomplete');
INSERT INTO "tasks" ("task", "date", "status")
VALUES ('Walk the dog', '5-31-20', 'Incomplete');
INSERT INTO "tasks" ("task", "date", "status")
VALUES ('Go for a bike ride.', '5-31-20', 'Incomplete');