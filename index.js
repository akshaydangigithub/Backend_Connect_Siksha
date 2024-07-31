const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/userModel");

const app = express();
const port = 8080;

connectDB();

app.get("/", (request, response) => {
  response.send("Hello World From express");
});

app.get("/about", (request, response) => {
  response.send("About Page");
});

app.post("/create", async (request, response) => {
  try {
    const newUser = await new User({
      name: "Akshay Dangi",
      email: "Akuu@gamil.com",
      password: "skcweifhrfheiwh",
      phone: 7898860838,
    });

    await newUser.save();

    response.json(newUser);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
