import 'dotenv/config';
import prisma from '../src/prisma/client.js';

try {
  await prisma.$connect();
  await prisma.$queryRaw`SELECT 1`;
  console.log('Banco de integração disponível.');
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error('Banco de integração indisponível.');
  console.error('Configure TEST_DATABASE_URL para um banco isolado de testes ou corrija backend/.env.');
  console.error(message);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
