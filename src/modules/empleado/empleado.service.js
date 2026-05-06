import prisma from "../../config/db.js";

export const obtenerEmpleados = async () => {
  return await prisma.empleado.findMany({
    select: {
      id: true,
      nombre: true,
      apellido: true,
      dni: true,
      email: true,
      telefono: true,
      activo: true,
      cargo: {
        select: {
          nombre: true,
        },
      },
    },
  });
};
