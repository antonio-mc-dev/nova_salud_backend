import { Router } from "express";
import { getMedicamentos, postMedicamento } from "./medicamento.controller.js";

import { verificarToken } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verificarToken, getMedicamentos);

router.post("/", verificarToken, postMedicamento);

export default router;
