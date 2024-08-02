import express from "express";
import connectDB from "./config/database.js";
import indexRouter from "./routes/indexRouter.js";

const app = express();
const port = 8080;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.send("Hello World");
});

// ======================== Routes =========================
app.use("/user", indexRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
