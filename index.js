import express from "express";
import connectDB from "./config/database.js";
import indexRouter from "./routes/indexRouter.js";
import cors from "cors";

const app = express();
const port = 8080;

connectDB();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});

app.get("/", (request, response) => {
  response.send("Hello World");
});

// ======================== Routes =========================
app.use("/user", indexRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
