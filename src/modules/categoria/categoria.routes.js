import { Router } from 'express';
import { verificarToken as verificarToken_mw } from '../../middlewares/auth.middleware.js';
import {
  getCategorias,
  postCategoria,
  putCategoria,
  deleteCategoria,
} from './categoria.controller.js';

const router = Router();

router.use(verificarToken_mw);

router.get('/', getCategorias);
router.post('/', postCategoria);
router.put('/:id', putCategoria);
router.delete('/:id', deleteCategoria);

export default router;
