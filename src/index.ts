import express from "express";
import sequelize from "./config/database";
import UserModel from "./models/UserModel";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", (req, res) => {
  const users = UserModel.findAll;
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
  });

app.listen(port, () => {
  console.log("Server is running on port", port);
});
function then(arg0: () => void) {
  throw new Error("Function not implemented.");
}
