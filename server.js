const express = require("express");
const morgan = require("morgan"); //it provides an info that how many time required to run an api
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//for deployment
import path from "path";
import { fileURLToPath } from "url";

//env config
dotenv.config();

//routes
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//mongodb connection
connectDB();
//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//deployment
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

//for deployment
app.use("*", function (req, resp) {
  resp.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `server running on ${process.env.DEV_MODE} mode  on port ${PORT}`.bgCyan
      .white
  );
});
