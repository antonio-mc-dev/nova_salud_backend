import { obtenerEmpleados } from './empleado.service.js'

export const getEmpleados = async (req, res) => {
  try {
    const empleados = await obtenerEmpleados()
    res.json({ ok: true, data: empleados })
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message })
  }
}