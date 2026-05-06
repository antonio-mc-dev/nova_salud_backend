import jwt from 'jsonwebtoken'

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ ok: false, mensaje: 'Token requerido' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.empleado = decoded
    next()
  } catch (error) {
    res.status(403).json({ ok: false, mensaje: 'Token inválido o expirado' })
  }
}