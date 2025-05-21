import React from "react";
import { Button, Table } from "antd";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../hooks/useProducts";
import { productsColumns, proveedoresColumns } from "../utils/productsColumns";

const Products = () => {
  const { products, proveedores, isModalVisible, setIsModalVisible, addProduct } = useProducts();
  
  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Agregar Producto
      </Button>

      <Table dataSource={products} columns={productsColumns} rowKey="id" />
      <h2>Proveedores</h2>
      <Table dataSource={proveedores} columns={proveedoresColumns} rowKey="id" />

      <ProductForm open={isModalVisible} onClose={() => setIsModalVisible(false)} onSubmit={addProduct} proveedores={proveedores} />
    </div>
  );
};

export default Products;
