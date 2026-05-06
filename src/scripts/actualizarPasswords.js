import 'dotenv/config'
import bcrypt from 'bcryptjs'
import prisma from '../config/db.js'

const actualizarPasswords = async () => {
  const hash1 = await bcrypt.hash('admin123', 10)
  const hash2 = await bcrypt.hash('empleado123', 10)

  await prisma.empleado.update({
    where: { email: 'carlos.quispe@novasalud.pe' },
    data: { contrasena: hash1 }
  })

  await prisma.empleado.update({
    where: { email: 'maria.huanca@novasalud.pe' },
    data: { contrasena: hash2 }
  })

  console.log('Contraseñas actualizadas')
  await prisma.$disconnect()
}

actualizarPasswords()