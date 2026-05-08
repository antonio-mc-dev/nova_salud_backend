import { Router } from 'express';
import { verificarToken as verificarToken_mw } from '../../middlewares/auth.middleware.js';
import {
  getClientes,
  getClientePorDocumento,
  postCliente,
  putCliente,
  deleteCliente,
} from './cliente.controller.js';

const router = Router();

router.use(verificarToken_mw);

router.get('/', getClientes);
router.get('/:dni', getClientePorDocumento);
router.post('/', postCliente);
router.put('/:id', putCliente);
router.delete('/:id', deleteCliente);

export default router;
