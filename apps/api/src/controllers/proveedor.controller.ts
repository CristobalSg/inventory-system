import { Request, Response } from "express";
import { crearProveedor, obtenerProveedor} from "../services/proveedor.service";

export const addProveedor = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    const proveedor = await crearProveedor({nombre});
    res.status(201).json( proveedor );
  } catch (error) {
    console.error("❌ Error al agregar proveedor:", error);
    res.status(500).json({ error: "Error al crear un proveedor", detalle: error });
  }
};

export const getProveedor = async (req: Request, res: Response) => {
  try {
    const proveedor = await obtenerProveedor();
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el Proveedor" });
  }
};
