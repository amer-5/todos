import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

const todos = [];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  if (req.headers.authorization) {
    try {
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(401).json("not authorized")
  }
});

app.post("/", (req, res) => {
  try {
    let { text } = req.body;
    const todo = { text: text, isCompleted: false, id: todos.length + 1 };
    todos.push(todo);
    text = "";
    res.status(201).json({ message: "Todo added successfully", todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const objWithIdIndex = todos.findIndex((obj) => obj.id === id);
    todos.splice(objWithIdIndex, 1);
    res.status(201).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const todo = todos.find((todo) => todo.id === id);
    todo.text = text;
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
