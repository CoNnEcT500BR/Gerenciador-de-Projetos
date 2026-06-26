import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.DB_HOST ?? 'localhost';
const port = Number(process.env.DB_PORT ?? 3306);
const user = process.env.DB_USER ?? 'root';
const password = process.env.DB_PASSWORD ?? '';
const database = process.env.DB_NAME ?? 'portfolio_db';

async function main() {
  const connection = await mysql.createConnection({ host, port, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
  console.log(`Database '${database}' created or already exists.`);
  await connection.end();
}

main().catch((error) => {
  console.error('Failed to create database:', error.message || error);
  process.exit(1);
});
