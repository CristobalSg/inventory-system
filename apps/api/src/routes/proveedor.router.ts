import { Router } from "express";
import { addProveedor, getProveedor } from "../controllers/proveedor.controller"

const router = Router();

router.get("/", getProveedor); // GET /api/...
router.post("/", addProveedor); // POST /apii/...

export default router;

