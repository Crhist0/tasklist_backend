module.exports = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    entities: [process.env.ENTITIES_DIR],
    migrations: [process.env.MIGRATIONS_DIR],
    cli: {
        entitiesDir: "src/core/infra/database/entities",
        migrationsDir: "src/core/infra/database/migrations",
    },
    subscribers: [],
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
};
