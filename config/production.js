module.exports = {
  port: 9000,
  log: {
    level: "info",
    disabled: false,
  },
  cors: {
    origins: ["https://two024-frontend-vc02-24.onrender.com"], // het adres waar je front-end op draait
    maxAge: 3 * 60 * 60,
  },
  database: {
    client: "mysql2",
    name: "SDP2_2324_DB_VC02",
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
