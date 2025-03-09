import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";

const app = express();
const port = 3000;

app.use(express.json());
app.use(userRoutes);

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
