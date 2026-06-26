import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const databaseUrl = process.env.DATABASE_URL ?? '';
const defaultDbConfig = {
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'password',
  database: process.env.DB_NAME ?? 'portfolio_db',
};

const dbConfig = databaseUrl
  ? (() => {
      const url = new URL(databaseUrl);
      return {
        host: url.hostname || defaultDbConfig.host,
        port: Number(url.port || defaultDbConfig.port),
        user: url.username || defaultDbConfig.user,
        password: url.password || defaultDbConfig.password,
        database: url.pathname?.replace(/^\//, '') || defaultDbConfig.database,
      };
    })()
  : defaultDbConfig;

const adapter = new PrismaMariaDb(dbConfig);
const prisma = new PrismaClient({ adapter });

export default prisma;
