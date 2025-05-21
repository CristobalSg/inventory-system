import { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/users")
      .then(res => setUsuarios(res.data))
      .catch(err => console.error(err));
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Correo", dataIndex: "email", key: "email" },
  ];

  return <Table dataSource={usuarios} columns={columns} rowKey="id" />;
};

export default Usuarios;
