import { Request, Response } from "express";
import { obtenerProductos, crearProducto, eliminarProducto, obtenerProductoById, actualizarProducto, obtenerProductoByCode } from "../services/product.service";
import { obtenerProveedorId } from "../services/proveedor.service";
import { AppError } from "../utils/errors";
import { log } from "console";

// ✅ Obtener todos los productos
export const getProducts = async (req: Request, res: Response) => {
  try {
    const productos = await obtenerProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

// ✅ Crear un nuevo producto
export const addProduct = async (req: Request, res: Response) => {
  try {
    const { nombre, valorCosto, stock, unit, valorVenta, codigoBarras, proveedorId } = req.body;

    if (!proveedorId) throw new AppError(400, "El proveedor es obligatorio");

    const proveedor = await obtenerProveedorId(proveedorId);
    if (!proveedor) throw new AppError(400, "El proveedor no existe");

    const product = await crearProducto({
      nombre,
      valorCosto,
      stock,
      unit,
      valorVenta,
      codigoBarras,
      proveedorId: proveedor.id
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al crear un producto", detalle: error.message });
  }
};

// ✅ Obtener un producto por ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    
    const id = parseInt(req.params.id, 10);
    // log(req.params.id)
    if (isNaN(id)) throw new AppError(400, "El ID debe ser un número válido");

    const producto = await obtenerProductoById(id);
    if (!producto) throw new AppError(404, "Producto no econtrado")

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto", detalle: error.message });
  }
};

// ✅ Obtener un producto por Codigo de barras
export const getProductByCodeBarra = async (req: Request, res: Response) => {
  try {
    
    const codigoBarras = req.params.codigoBarras;

    const producto = await obtenerProductoByCode(codigoBarras);
    if (!producto) throw new AppError(404, "Producto pro codigo de barra no econtrado")

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto por codigo de barras", detalle: error.message });
  }
};

// ✅ Actualizar un producto
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new AppError(400, "El ID debe ser un número válido");

    const producto = await obtenerProductoById(id);
    if (!producto) throw new AppError(404, "Producto no econtrado")
    
    const {proveedorId} = req.body
    const proveedor = await obtenerProveedorId(proveedorId);
    if (!proveedor) throw new AppError(400, "El proveedor no existe");

    log(proveedorId)
    const updatedProduct = await actualizarProducto(id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto", detalle: error.message });
  }
};

// ✅ Eliminar un producto
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new AppError(400, "El ID debe ser un número válido");

    const producto = await obtenerProductoById(id);
    if (!producto) throw new AppError(404, "Producto no econtrado")

    await eliminarProducto(id);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto", detalle: error.message });
  }
};
