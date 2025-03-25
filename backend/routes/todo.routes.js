import express from "express";
import { getTodos } from "../controller/todo.controller.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id", updateTodo);

export default router;
