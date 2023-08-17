const config = {
  PORT: process.env.PORT || 3000,
  HOST: "localhost",
  DBPORT: 27017,
  DB: process.env.DBNAME || "TEST",
  SECRET: process.env.SECRET || null,
};

export default config;
