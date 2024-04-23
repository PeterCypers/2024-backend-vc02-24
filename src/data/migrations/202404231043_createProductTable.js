const { tables } = require('..'); //1 folder up -> index

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.product, (table) => {
            table.increments('productid');
            table.double('eenheidsprijs')
                .notNullable();
            table.string('levermethode')
                .notNullable();
            table.string('naam')
                .notNullable();
            table.integer('stock')
                .unsigned() //mag niet negatief zijn
                .notNullable();
        });
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.product);
    },
};