import { Request, Response } from "express";
// import {Request} from "express";
import { getAllUsers, createUser } from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await createUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al crear usuario" });
  }
};
