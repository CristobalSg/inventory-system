import { PrismaClient, UnitType } from "@prisma/client";
import { CreateProductData } from "../utils/schemas";
import { AppError } from "../utils/errors";

const prisma = new PrismaClient();

// ✅ Crear producto con validación de 'unit'
export const crearProducto = async (data: CreateProductData) => {
    if (!Object.values(UnitType).includes(data.unit)) {
        throw new AppError(400, "El tipo de unidad no es válido");
    }

    return await prisma.producto.create({
        data: {
            nombre: data.nombre,
            stock: data.stock,
            valorVenta: data.valorVenta,
            valorCosto: data.valorCosto,
            unit: data.unit,
            codigoBarras: data.codigoBarras,
            proveedorId: data.proveedorId
        }
    });
};

// ✅ Obtener todos los productos
export const obtenerProductos = async () => {
    return await prisma.producto.findMany();
};

// ✅ Buscar un producto por código de barras
export const buscarProductoPorCodigo = async (codigoBarras: string) => {
    return await prisma.producto.findUnique({ where: { codigoBarras } });
};

// ✅ Eliminar producto por ID (más seguro que usar código de barras)
export const eliminarProducto = async (id: number) => {
    return await prisma.producto.delete({ where: { id } });
};

// ✅ Obtener producto por ID
export const obtenerProductoById = async (id: number) => {
    return await prisma.producto.findUnique({ where: { id } });
};

// ✅ Obtener producto por ID
export const obtenerProductoByCode = async (codigoBarras: string) => {
    return await prisma.producto.findUnique({ where: { codigoBarras } });
};

// ✅ Actualizar producto por ID
export const actualizarProducto = async (id: number, data: CreateProductData) => {
    return await prisma.producto.update({
        where: { id },
        data
    });
};