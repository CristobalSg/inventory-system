import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  return await prisma.usuario.findMany();
};

export const createUser = async (nombre: string, email: string, password: string) => {
  return await prisma.usuario.create({
    data: { nombre, email, password },
  });
};
