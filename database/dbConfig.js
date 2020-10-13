const knex = require("knex");

const knexConfig = require("../knexfile.js");

const development = process.env.DB_ENV || "development";

module.exports = knex(knexConfig[development]);
