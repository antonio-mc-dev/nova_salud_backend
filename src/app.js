import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import empleadoRoutes from "./modules/empleado/empleado.routes.js";
import medicamentoRoutes from "./modules/medicamento/medicamento.routes.js";
import laboratorioRoutes from "./modules/laboratorio/laboratorio.routes.js";
import categoriaRoutes from "./modules/categoria/categoria.routes.js";
import presentacionRoutes from "./modules/presentacion/presentacion.routes.js";
import unidadVentaRoutes from "./modules/unidad_venta/unidad_venta.routes.js";
import cargoRoutes from "./modules/cargo/cargo.routes.js";
import clienteRoutes from "./modules/cliente/cliente.routes.js";
import ventaRoutes from "./modules/venta/venta.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ mensaje: "API Botica Nova Salud" }));

app.use("/auth", authRoutes);
app.use("/empleados", empleadoRoutes);
app.use("/medicamentos", medicamentoRoutes);
app.use("/laboratorios", laboratorioRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/presentaciones", presentacionRoutes);
app.use("/unidades-venta", unidadVentaRoutes);
app.use("/cargos", cargoRoutes);
app.use("/clientes", clienteRoutes);
app.use("/ventas", ventaRoutes);

export default app;
