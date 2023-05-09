const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routers/index");

require("dotenv").config();

app.use(express.json());
app.use([routes]);
app.use(
  cors({
    origin: ["http://localhost:5000"],
  })
);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(PORT);
});
