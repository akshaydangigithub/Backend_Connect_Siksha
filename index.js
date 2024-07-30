const express = require("express");

const app = express();
const port = 8080;

// get -> read
// post -> create
// put -> update
// delete -> delete

app.get("/", (request, response) => {
  response.send("Hello World From express");
});

app.get("/about", (request, response) => {
  response.send("About Page");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
