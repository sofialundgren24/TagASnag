import { PrismaClient } from "../prisma/generated/client"
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// 1. Skapa en connection pool för pg
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// 2. Skapa adaptern
const adapter = new PrismaPg(pool);

// 3. Skapa Prisma-klienten
const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}