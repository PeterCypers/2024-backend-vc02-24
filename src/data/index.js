const { join } = require("path");

const config = require("config");
const knex = require("knex");

const { getLogger } = require("../core/logging");

const moment = require('moment');

const NODE_ENV = config.get("env");
const isDevelopment = NODE_ENV === "development";

const DATABASE_CLIENT = config.get("database.client");
const DATABASE_NAME = config.get("database.name");
const DATABASE_HOST = config.get("database.host");
const DATABASE_PORT = config.get("database.port");
const DATABASE_USERNAME = config.get("database.username");
const DATABASE_PASSWORD = config.has("database.password")
  ? config.get("database.password")
  : "";

let knexInstance;

async function initializeData() {
  const logger = getLogger();
  logger.info("Initializing connection to the database");

  const knexOptions = {
    client: DATABASE_CLIENT,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      // name: DATABASE_NAME,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      insecureAuth: isDevelopment,
      // typeCast uit moment package om de DATE uit de db om te vormen naar een juist formaat zonder tijd
      typeCast: function (field, next) {
        if (field.type == 'DATE') {
          return moment(field.string()).format('YYYY-MM-DD');
        }
        return next();
      }
    },
    debug: isDevelopment,
    migrations: {
      tableName: "knex_meta",
      directory: join("src", "data", "migrations"),
    },
    seeds: {
      directory: join("src", "data", "seeds"),
    },
  };

  knexInstance = knex(knexOptions);

  // Check the connection, create the database and then reconnect
  try {
    await knexInstance.raw("SELECT 1+1 AS result");
    await knexInstance.raw(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`);

    // We need to update the Knex configuration and reconnect to use the created database by default
    // USE ... would not work because a pool of connections is used
    await knexInstance.destroy();

    knexOptions.connection.database = DATABASE_NAME;
    knexInstance = knex(knexOptions);
    await knexInstance.raw("SELECT 1+1 AS result");
  } catch (error) {
    logger.error(error.message, { error });
    throw new Error("Could not initialize the data layer");
  }

  // Run migrations (enkel in test-omgeving)
  if (NODE_ENV === "test") {
    try {
      await knexInstance.migrate.latest();
    } catch (error) {
      logger.error("Error while migrating the database", {
        error,
      });

      // No point in starting the server when migrations failed
      throw new Error("Migrations failed, check the logs");
    }
  }

  //   if (isDevelopment) {
  //     try {
  //       await knexInstance.seed.run();
  //     } catch (error) {
  //       logger.error('Error while seeding database', {
  //         error,
  //       });
  //     }
  //   }

  logger.info("Succesfully connected to the database");

  return knexInstance;
}

function getKnex() {
  if (!knexInstance)
    throw new Error(
      "Please initialize the data layer before getting the Knex instance"
    );
  return knexInstance;
}

async function shutdownData() {
  const logger = getLogger();

  logger.info("Shutting down database connection");

  await knexInstance.destroy();
  knexInstance = null;

  logger.info("Database connection closed");
}
//dit moet in uppercase blijven staan -> java populate_DB
const tables = Object.freeze({
  gebruiker: "GEBRUIKER",
  product: "PRODUCT",
  bestelling: "BESTELLING",
  klant: "KLANT",
  leverancier: "LEVERANCIER",
  bedrijf: "BEDRIJF",
  betaling: "BETALING",
  notificatie: "NOTIFICATIE",
  besteldProduct: "BESTELDPRODUCT",
  bestelling_besteldProduct: "BESTELLING_BESTELDPRODUCT",
});

module.exports = {
  tables,
  getKnex,
  initializeData,
  shutdownData,
};
