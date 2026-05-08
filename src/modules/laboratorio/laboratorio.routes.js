import { Router } from 'express';
import { verificarToken as verificarToken_mw } from '../../middlewares/auth.middleware.js';
import {
  getLaboratorios,
  postLaboratorio,
  putLaboratorio,
  patchLaboratorio,
  deleteLaboratorio,
} from './laboratorio.controller.js';

const router = Router();

router.use(verificarToken_mw);

router.get('/', getLaboratorios);
router.post('/', postLaboratorio);
router.put('/:id', putLaboratorio);
router.patch('/:id', patchLaboratorio);
router.delete('/:id', deleteLaboratorio);

export default router;
