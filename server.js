require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dbConn = require("./config/db");
// const Projects = require("./routes/projectRoute");
const Users = require("./routes/userRoute");
const Blogs = require("./routes/blogRoute");
app.use(express.json());

app.use(cors());
const port = process.env.PORT || 7778;
// app.use("/projects", Projects);
app.use("/users", Users);
app.use("/blogs", Blogs);

app.get("/", (req, res) => {
  res.status(200).json("Welcome");
});

app.listen(port, () => {
  console.log(`Server running in : ${port}`);
});
