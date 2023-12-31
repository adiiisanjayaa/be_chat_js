module.exports = {
  development: {
    client: "pg",
    connection: {
      database: process.env.DATABASE_NAME || "dbBEChatJS",
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_USER_PW || "postgres",
      port: process.env.POSTGRES_PORT || 5432,
      host: process.env.POSTGRES_HOST || "localhost",
    },
    migrations: {
      directory: "./apps/db/migrations",
    },
    seeds: {
      directory: "./apps/db/seeds",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./apps/db/migrations",
    },
    seeds: {
      directory: "./apps/db/seeds",
    },
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
