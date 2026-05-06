import { Router } from 'express'
import { getEmpleados } from './empleado.controller.js'
import { verificarToken } from '../../middlewares/auth.middleware.js'

const router = Router()

router.get('/', verificarToken, getEmpleados)

export default router