import { Router } from "express";
import { getUsers, addUser } from "../controllers/user.controller";

const router = Router();

router.get("/", getUsers); // GET /api/users
router.post("/", addUser); // POST /api/users

export default router;
