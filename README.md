# Project Name
A full-stack application that is meant to mirror popular modal image views.
> Project description

## Related Projects
  - https://github.com/fec4-gandolf/bid-buy
  - https://github.com/fec4-gandolf/Napoleon-Service
  - https://github.com/fec4-gandolf/PeopleAlsoViewed

## Table of Contents
1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)

## Usage
1. To set up environmental variables
  create file within root directory '.env'
  Contents of file for a local setup should go as follows
  ```sh
      server_host = localhost
      server_port = 3003
      DB_choice = db_postgresql
      DB_user = `your OS username`
      DB_host = localhost
      DB_database = postgres
      DB_port = 5432
      DB_table = images
  ```
2. To initialize database schema, from root directory run
```sh
mysql -u `userName` -p < schema.sql
```
3. To set up database seeding range, modify values for `max` and `min` located in server/seeder.js to reflect which database autoincremented ID to start and finish at.

4. To intitalize seeding, from root directory run
```sh
node server/seederinit.js
```
5. To compile files using webpack run
```sh
npm run react-dev
```

6. to run server run
```sh
npm run start:dev
```


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```
## API Endpoints

| HTTP METHOD      | POST                            | GET                 | PUT                 | DELETE         |
| ---------------- | --------------------------------| ------------------- | ------------------- | -------------- |
| CRUD             | CREATE                          | READ                | UPDATE              | DELETE         |
| /api/images      | creates new listing with images | n/a                 | n/a                 |   n/a          |
| /api/images/:id  | 404                             | responds w/ images  | updates/adds images | deletes images |
```