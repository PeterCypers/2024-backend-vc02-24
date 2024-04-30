const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.bedrijf, (table) => {
      // primary key column
      table.string('NAAM').primary().unique();
      // other columns
      table.string('BTWNR')
        .notNullable();
      table.string('EMAILADRES')
        .notNullable();
      table.tinyint('ISACTIEF', 1)
        .notNullable();
      table.string('LOGO')
        .notNullable();
      table.string('REKENINGNUMMER')
        .notNullable();
      table.string('SECTOR')
        .notNullable();
      table.string('TELEFOONNUMMER')
        .notNullable();
      table.string('LAND')
        .notNullable();
      table.string('POSTCODE')
        .notNullable();
      table.string('STAD')
        .notNullable();
      table.string('STRAAT')
        .notNullable();
      table.string('STRAATNR')
        .notNullable();
      //andere manier van FK maken
      table.integer('KLANT_GEBRUIKERID').unsigned().notNullable().references('GEBRUIKERID').inTable(tables.gebruiker).onDelete('CASCADE');
      table.integer('LEVERANCIER_GEBRUIKERID').unsigned().notNullable().references('GEBRUIKERID').inTable(tables.gebruiker).onDelete('CASCADE');
      
      
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.bedrijf);
  }
};