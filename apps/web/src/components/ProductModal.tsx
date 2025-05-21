import React from "react";
import { Modal, Form, Input, InputNumber, Select, Button, Typography } from "antd";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
}

const ProductModal: React.FC<ProductModalProps> = ({open,onClose , name }) => {
  return (
    <div>
      <Modal title="Xde" open={open} onCancel={onClose}>
        <p>Hola, {name}</p>
      </Modal>
    </div>
  );
};

export default ProductModal;
