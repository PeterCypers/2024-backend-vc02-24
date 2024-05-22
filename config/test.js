module.exports = {
  port: 9000,
  log: {
    level: "silly",
    disabled: false,
  },
  cors: {
    origins: ["http://localhost:5173"], // het adres waar je front-end op draait
    maxAge: 3 * 60 * 60,
  },
  /* aanpassen naar je eigen lokaal database -> vermoed je school-db connectie op localhost 3306 met username 'root'
    zet passwoord als je een hebt in de .env.test file (zie pinned bericht discord) */
  database: {
    client: "mysql2",
    host: "localhost",
    port: 3306,
    name: "sdp2_test", //naam van de gegenereerde DB
    username: "root",
    password: "",
  },
  auth: {
    jwt: {
      secret: "hq5eE8qvt1v89qc46r5ze4ntw6iKry31yhDsv2h13gh1e4vqg9Ar4g1vBrq",
      expirationInterval: 60 * 60 * 1000, // ms (1 hour)
      issuer: "b2bportal.delaware.be",
      audience: "b2bportal.delaware.be",
    },
  },
};
