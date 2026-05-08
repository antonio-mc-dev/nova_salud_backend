import { Router } from 'express';
import { verificarToken as verificarToken_mw } from '../../middlewares/auth.middleware.js';
import {
  getVentas,
  getVentaById,
  postVenta,
} from './venta.controller.js';

const router = Router();

router.use(verificarToken_mw);

router.get('/', getVentas);
router.get('/:id', getVentaById);
router.post('/', postVenta);

export default router;
