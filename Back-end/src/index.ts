import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import categoryRoutes from "./routes/categoriesRoute";
import assessmentRoutes from "./routes/assessmentRoutes";
import authorRoutes from "./routes/authorRoutes";

const app = express();
const port = 3000;

app.use(express.json());
app.use(userRoutes);
app.use(bookRoutes);
app.use(categoryRoutes);
app.use(assessmentRoutes);
app.use(authorRoutes);

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
