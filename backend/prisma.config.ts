import type { DatasourceType } from '@prisma/client';

export default {
  schema: './prisma/schema.prisma',
  datasources: {
    db: {
      provider: 'mysql',
      url: process.env.DATABASE_URL
    } as DatasourceType
  }
};
