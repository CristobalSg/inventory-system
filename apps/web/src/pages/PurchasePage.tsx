import axios from "axios";
import { Col, Row } from 'antd';
import type { InputRef } from "antd";
import '@ant-design/v5-patch-for-react-19';
import { useProducts } from "../hooks/useProducts";
import React, { useState, useEffect, useRef } from "react";
import { Input, Button, List, Typography, message, Modal, InputNumber } from "antd";

const PurchasePage = () => {
    const { products, isModalVisible, setIsModalVisible } = useProducts();

    const [peso, setPeso] = useState<number | null>(null);
    const [codigoBarras, setCodigoBarras] = useState<string>("");
    const [productoSeleccionado, setProductoSeleccionado] = useState<any>(null);
    const [cart, setCart] = useState<{ nombre: string; cantidad: number; precioFinal: number }[]>([]);
    
    // const inputRef = useRef<HTMLInputElement | null>(null);
    const inputCodigoRef = useRef<InputRef>(null); // ✅ Ref para código de barras
    const inputPesoRef = useRef<HTMLInputElement | null>(null); // ✅ Ref para InputNumber

     // Enfocar el input del código de barras al cargar la página
    useEffect(() => {
        inputCodigoRef.current?.focus();
    }, []);

    useEffect(() => {
        if (isModalVisible) {
            setTimeout(() => inputPesoRef.current?.focus(), 1000);
        }
    }, [isModalVisible]);

    // Enfocar el input del modal cuando se abre
    useEffect(() => {
        if (isModalVisible) {
            setTimeout(() => {
                const inputElement = document.querySelector('.peso-input .ant-input') as HTMLInputElement;
                if (inputElement) inputElement.focus();
            }, 200);
        }
    }, [isModalVisible]);

    // Buscar producto por código de barras
    const buscarProducto = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/products/code/${codigoBarras}`);
            if (response.data) {
                agregarAlCarrito(response.data);
                setCodigoBarras(""); // Limpiar input
            } else {
                message.warning("Producto no encontrado.");
            }
        } catch {
            message.error("Error al buscar el producto.");
        }
    };

    // Agregar al carrito
    const agregarAlCarrito = (producto: any) => {
        if (producto.unit === "KG") {
            setProductoSeleccionado(producto);
            setIsModalVisible(true);
        } else {
            const productoUnitario = {
                ...producto,
                cantidad: 1,
                precioFinal: producto.valorVenta,
            };
            setCart([...cart, productoUnitario]);
            message.success("Producto agregado al carrito");
        }
    };

    // Confirmar peso en productos por KG
    const confirmarPeso = () => {
        if (!peso || peso <= 0) {
            message.error("Ingrese un peso válido");
            return;
        }

        if (productoSeleccionado) {
            const precioFinal = productoSeleccionado.valorVenta * (peso / 1000);
            const productoConPeso = {
              ...productoSeleccionado,
              cantidad: peso,
                precioFinal,
              };
            setCart([...cart, productoConPeso]);
            message.success(`Producto agregado: ${peso}g - $${precioFinal.toFixed(2)}`);
        }

        setIsModalVisible(false);
        setPeso(null);
        setTimeout(() => inputCodigoRef.current?.focus(), 300);
      };

    return (
        <div style={{ padding: "20px", width:"1500px"}}>
          <Row>
            <Col span={6} push={18}>
              {/* Lista de productos */}
              <Typography.Title level={4}>Productos Disponibles</Typography.Title>
              <List
                  bordered
                  dataSource={products}
                  renderItem={(item) => (
                      <List.Item>
                          <div>
                              <Typography.Text>{item.nombre} - {item.stock} en stock</Typography.Text>
                              <Button onClick={() => agregarAlCarrito(item)} style={{ marginLeft: "10px" }}>Agregar</Button>
                          </div>
                      </List.Item>
                  )}
              />
            </Col>
            <Col span={18} pull={6}>
              <Typography.Title level={2}>Carrito de Compras</Typography.Title>
              {/* Input para código de barras */}
              <Input
                  ref={inputCodigoRef}
                  placeholder="Ingrese código de barras"
                  value={codigoBarras}
                  onChange={(e) => setCodigoBarras(e.target.value)}
                  onPressEnter={buscarProducto}
                  style={{ width: "300px", marginBottom: "20px" }}
              />

              {/* Lista del carrito */}
              <Typography.Title level={4}>Carrito</Typography.Title>
              <List
                  bordered
                  dataSource={cart}
                  renderItem={(item) => (
                      <List.Item>
                          <Typography.Text>{item.nombre} - {item.cantidad} - ${item.precioFinal.toFixed(2)}</Typography.Text>
                      </List.Item>
                  )}
              />
            </Col>
          </Row>
            {/* Modal para ingresar el peso */}
            <Modal
                title="Ingresar peso del producto"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalVisible(false)}>Cancelar</Button>,
                    <Button key="confirm" type="primary" onClick={confirmarPeso}>Aceptar</Button>
                ]}
            >
                <p>Ingrese el peso en gramos:</p>
                <InputNumber
                    ref={inputPesoRef}
                    className="peso-input" // 🔹 Clase CSS para buscar el input
                    min={1}
                    value={peso}
                    onChange={(value) => setPeso(value ?? null)}
                    placeholder="Ingrese el peso"
                    addonAfter="g"
                    onPressEnter={confirmarPeso}
                    style={{ width: "100%" }}
                />
            </Modal>

        </div>
    );
};

export default PurchasePage;
