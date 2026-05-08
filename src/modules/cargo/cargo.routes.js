import { Router } from 'express';
import { verificarToken as verificarToken_mw } from '../../middlewares/auth.middleware.js';
import {
  getCargos,
  postCargo,
  putCargo,
  deleteCargo,
} from './cargo.controller.js';

const router = Router();

router.use(verificarToken_mw);

router.get('/', getCargos);
router.post('/', postCargo);
router.put('/:id', putCargo);
router.delete('/:id', deleteCargo);

export default router;
