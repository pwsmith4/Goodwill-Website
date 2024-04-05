require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
//const { MONGO_URL, PORT } = process.env;
const PORT = 4000;
mongoose
  .connect("mongodb+srv://gamepark1:Il0vegames@cluster0.g6tplxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error("Error: " +err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});