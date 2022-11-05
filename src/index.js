const express = require("express");
const connection = require("../Config/db");
const cors = require("cors");
require("dotenv").config();
const todoRouter = require("../Routes/Todo.routes");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 8040;
app.use(express.json());

app.use("/todo", todoRouter);

app.listen(PORT, async () => {
  try {
    await connection();
    console.log(`http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
