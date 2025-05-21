import { Router } from "express";
import { getProducts, addProduct, getProductById, updateProduct, deleteProduct, getProductByCodeBarra } from "../controllers/product.controller"

const router = Router();

// router.get("/", getProducts); // GET /api/...
// router.post("/", addProduct); // POST /apii/...

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/code/:codigoBarras", getProductByCodeBarra);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;

