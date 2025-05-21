import app from "./app";
import { config } from "dotenv";

config(); // Cargar variables de entorno

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});