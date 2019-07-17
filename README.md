# images-modal
A full-stack application that is meant to mirror popular modal image views.
# Project Name

> Project description

## Related Projects

  - https://github.com/fec4-gandolf/bid-buy
  - https://github.com/fec4-gandolf/Napoleon-Service
  - https://github.com/fec4-gandolf/PeopleAlsoViewed
## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

1. To initialize database schema, from root directory run

```sh
mysql -u `userName` -p < schema.sql
```
2. To set up database seeding range, modify values for `max` and `min` located in server/seeder.js to reflect which database autoincremented ID to start and finish at.

3. To intitalize seeding, from root directory run

```sh
node server/seederinit.js
```

4. to compile files using webpack run

```sh
npm run react-dev
```

5. to run server run

```sh
nodemon server/server.js
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
