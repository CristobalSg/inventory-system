import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const crearProveedor = async (data: any) => {
    return await prisma.proveedor.create({data});
};

export const obtenerProveedor = async () => {
    return await prisma.proveedor.findMany();
}

export const obtenerProveedorId = async (id: number) => {
    return await prisma.proveedor.findFirst({where: {id}});
}