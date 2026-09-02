import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./src/generated/prisma/client.js";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

try {
  const users = await prisma.user.findMany();

  console.log("PRISMA MYSQL CONNECTION OK");
  console.log(users);
} catch (error) {
  console.error("PRISMA CONNECTION FAILED");
  console.error(error);
} finally {
  await prisma.$disconnect();
}