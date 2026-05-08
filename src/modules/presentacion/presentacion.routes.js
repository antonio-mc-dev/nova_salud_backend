import { Router } from 'express';
import { verificarToken as verificarToken_mw } from '../../middlewares/auth.middleware.js';
import {
  getPresentaciones,
  postPresentacion,
  putPresentacion,
  deletePresentacion,
} from './presentacion.controller.js';

const router = Router();

router.use(verificarToken_mw);

router.get('/', getPresentaciones);
router.post('/', postPresentacion);
router.put('/:id', putPresentacion);
router.delete('/:id', deletePresentacion);

export default router;
