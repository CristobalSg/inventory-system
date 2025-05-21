import express from "express";
import cors from "cors";
// import userRoutes from "./routes/user.routes";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import proveedorRoutes from "./routes/proveedor.router"
import { errorHandler } from "./utils/errors";

const app = express();
app.use(cors()); // Permitir peticiones desde el frontend
app.use(express.json()); // Permitir recibir JSON en las peticiones

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes)
app.use("/api/proveedor", proveedorRoutes)

app.use(errorHandler)

export default app;
