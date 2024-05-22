module.exports = {
  port: 9000,
  log: {
    level: "info",
    disabled: false,
  },
  cors: {
    origins: ["http://localhost:5173"], // het adres waar je front-end op draait
    maxAge: 3 * 60 * 60,
  },
};
