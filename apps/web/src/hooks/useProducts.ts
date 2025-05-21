import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

export interface Product {
  id: number;
  nombre: string;
  valorCosto: number;
  stock: number;
  valorVenta: number;
  codigoBarras: string;
  proveedorId: number;
}

export interface Proveedor {
  id: number;
  nombre: string;
}

export const useProducts = () => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/api/products")
      .then(res => setProducts(res.data))
      .catch(() => message.error("Error cargando productos"));

    axios.get("http://localhost:3000/api/proveedor")
      .then(res => setProveedores(res.data))
      .catch(() => message.error("Error cargando proveedores"));
  }, []);

  const addProduct = async (values: any) => {
    try {
      await axios.post("http://localhost:3000/api/products", values)
      message.success("Producto agregado correctamente");
      setIsModalVisible(false);
    } catch (error) {
      message.error("Error al agregar producto");
      console.error("Error de formulario",error)
    }
  };

  return { products, proveedores, isModalVisible, setIsModalVisible, addProduct };
};
