const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.gebruiker, (table) => {
      table.increments("GEBRUIKERID");
      table.string("ROL", 31)
        .notNullable();
      table.string("EMAILADRES")
        .notNullable();
      table.tinyint("ISACTIEF", 1)
        .notNullable();
      table.string("NAAM")
        .notNullable();
      table.string("WACHTWOORD")
        .notNullable();
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.gebruiker);
  },
};