import express from "express";
import cors from "cors";
import empleadoRoutes from "./modules/empleado/empleado.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import medicamentoRoutes from "./modules/medicamento/medicamento.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/empleados", empleadoRoutes);
app.use("/medicamentos", medicamentoRoutes);

export default app;
