import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import categoryRoutes from "./routes/categoriesRoute";
import assessmentRoutes from "./routes/assessmentRoutes";
import authorRoutes from "./routes/authorRoutes";
import loginRoutes from "./routes/loginRoutes";
import "./models/associations";

const app = express();

app.use(cors()); // Permitir requisições do front-end
app.use(express.json()); // Permitir JSON no body das requisições

// Rotas
app.use(userRoutes);
app.use(bookRoutes);
app.use(categoryRoutes);
app.use(assessmentRoutes);
app.use(authorRoutes);
app.use(loginRoutes);

export default app;
