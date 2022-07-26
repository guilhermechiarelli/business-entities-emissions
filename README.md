## The solution

This project is an API which basically stores business entities with name and emissions data. It's following some principles of SOLID and clean architecture for organization purposes.
The project has a business entity domain with 4 attributes: id, name, path and emissions. All of those fields are mapped in a database table called business_entities. To create the database schema, it's necessary to run the migrations command as described bellow as well as store the CSV file data in the database.
To ensure the best operation of the system, all the use cases are covered by unit tests using Jest.

## Tech

- Language: NodeJS (v16.13.2) + Typescript
- Database: Postgres

## Start project

After cloning and accessing this repository, you will have to:
- Start a Postgres DB instace on port 5432. It can be done with Docker running the comand `docker run --name postgres-db -e POSTGRES_DB=databasename -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres`;
- Create a .env file in the root of this repository based on .env.example file available with the information of the Postgres DB instace created;
- Install the dependecies running the command `npm install`;
- Run the script `npm run migrations` to create the database schema;
- Run the script `npm run start:dev` to start the application;
- The API will start on port 3333.

## API methods

Once the project is started, to access the API methods, you can make HTTP requests to the routes bellow via `curl` or any other API Client.
The base_url refers to the URL. In case of development environment, it will be http://localhost:3333.

| Description | HTTP method | URL | Body (JSON)
| ------ | ------ | ------ | ------ | 
| Get the total emissions for a Business Entity | GET | {base_url}/total-emissions/{id} |
| Get the names of full ancestry for a Business Entity | GET | {base_url}/ancestry-names/{id} |
| Create new Business Entity | POST | {base_url}/create | { name: string, parentId: number, emissions: number}
| Set emissions on a Business Entity | PUT | {base_url}/update/{id} | { emissions: number }

## Store CSV data

There's a CSV data in the project that can be easily uploaded in the database running the command `npm run seed`.
Note: to run this script, you have to complete all the steps in the "Start project" session.

## Tests

To run the tests, you can run the following script `npm run test`.
Note: to run this script, you have to complete all the steps in the "Start project" session.