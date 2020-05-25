import { createConnection } from 'typeorm';

export const postgresProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'snippsy',
      password: 'snippsy',
      database: 'snippsy',
      entities: [
        __dirname + "/../../**/*.entity{.ts,.js}",
      ],
      migrationsTableName: 'db_migrations',
      migrations: ["core/infrastructure/postgres/migration/*.js"],
      cli: {
        migrationsDir: "src/core/infrastructure/postgres/migration"
      },
      synchronize: true,
      // autoLoadEntities: true
    }),
  },
];
