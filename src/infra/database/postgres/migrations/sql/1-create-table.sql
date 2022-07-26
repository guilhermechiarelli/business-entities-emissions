CREATE TABLE business_entities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64),
    path  INTEGER[],
    emissions INTEGER
);