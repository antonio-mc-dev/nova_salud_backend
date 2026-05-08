import { Router } from 'express';
import { verificarToken as verificarToken_mw } from '../../middlewares/auth.middleware.js';
import {
  getUnidadesVenta,
  postUnidadVenta,
  putUnidadVenta,
  deleteUnidadVenta,
} from './unidad_venta.controller.js';

const router = Router();

router.use(verificarToken_mw);

router.get('/', getUnidadesVenta);
router.post('/', postUnidadVenta);
router.put('/:id', putUnidadVenta);
router.delete('/:id', deleteUnidadVenta);

export default router;
