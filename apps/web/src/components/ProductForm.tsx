import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Select, Button, Typography } from "antd";
import { Proveedor } from "../hooks/useProducts";

const { Option } = Select;
const { Text } = Typography;

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  proveedores: Proveedor[];
}

const ProductForm: React.FC<ProductFormProps> = ({ open, onClose, onSubmit, proveedores }) => {
  const [form] = Form.useForm();
  const [unit, setUnit] = useState("UNIT");
  const [cantidad, setCantidad] = useState(1);
  const [valorCosto, setValorCosto] = useState(0);
  const [valorVenta, setValorVenta] = useState(0);
  const [precioVenta, setPrecioVenta] = useState(0);
  const [incluirIVA, setIncluirIVA] = useState(false);

  const calcularPrecioVenta = (valor: number, cantidad: number, unit: string) => {
    let precioBase = unit === "KG" ? (valor / cantidad) * 1.5 : valor * 1.3;
    return incluirIVA ? precioBase * 1.19 : precioBase;
  };

  return (
    <Modal title="Agregar Producto" open={open} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: "Ingrese un nombre" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="unit" label="Unidad" initialValue="UNIT">
          <Select onChange={(value) => setUnit(value)}>
            <Option value="KG">Kilogramos (KG)</Option>
            <Option value="UNIT">Unidad (UNIT)</Option>
            <Option value="PACK">Paquete (PACK)</Option>
          </Select>
        </Form.Item>

        <Form.Item name="valorCosto" label="Valor Costo" rules={[{ required: true }]}>
            <InputNumber
                min={0}
                value={valorCosto}
                onChange={(value) => {
                const newValue = value ?? 0; // Si es null, asignamos 0
                setValorCosto(newValue);
                setPrecioVenta(calcularPrecioVenta(newValue, cantidad, unit));
                }}
            />
        </Form.Item>

        <Form.Item name="stock" label="Cantidad" rules={[{ required: true }]}>
            <InputNumber
                min={0}
                step={unit === "KG" ? 0.1 : 1}
                value={cantidad}
                onChange={(value) => {
                const newValue = value ?? 1; // Si es null, asignamos 1
                setCantidad(newValue);
                setPrecioVenta(calcularPrecioVenta(valorCosto, newValue, unit));
                }}
            />
        </Form.Item>

        <Form.Item name="valorVenta" label="Valor Venta" rules={[{ required: true }]}>
            <InputNumber
                min={0}
                value={valorVenta}
                onChange={(value) => {
                const newValue = value ?? 0; // Si es null, asignamos 0
                setValorCosto(newValue);
                }}
            />
        </Form.Item>

        <Form.Item>
          <Text strong>Estimado de Venta: ${precioVenta.toFixed(2)}</Text>
        </Form.Item>

        <Form.Item name="codigoBarras" label="Código de Barras" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="proveedorId" label="Proveedor" initialValue={2} rules={[{ required: true }]}>
          <Select>
            {proveedores.map((prov) => (
              <Option key={prov.id} value={prov.id}>
                {prov.nombre}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Agregar
        </Button>
      </Form>
    </Modal>
  );
};

export default ProductForm;
