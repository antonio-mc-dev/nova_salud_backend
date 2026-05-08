import prisma from '../../config/db.js';

export const obtenerPresentaciones = async () => {
  return await prisma.presentacion.findMany({
    select: {
      id: true,
      nombre: true,
    },
  });
};

export const crearPresentacion = async (data) => {
  return await prisma.presentacion.create({
    data: {
      nombre: data.nombre,
    },
  });
};

export const actualizarPresentacion = async (id, data) => {
  return await prisma.presentacion.update({
    where: { id: parseInt(id) },
    data: {
      nombre: data.nombre,
    },
  });
};

export const eliminarPresentacion = async (id) => {
  return await prisma.presentacion.delete({
    where: { id: parseInt(id) },
  });
};
