import prisma from '../../config/db.js';

export const obtenerCargos = async () => {
  return await prisma.cargo.findMany({
    select: {
      id: true,
      nombre: true,
      descripcion: true,
    },
  });
};

export const crearCargo = async (data) => {
  return await prisma.cargo.create({
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
    },
  });
};

export const actualizarCargo = async (id, data) => {
  return await prisma.cargo.update({
    where: { id: parseInt(id) },
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
    },
  });
};

export const eliminarCargo = async (id) => {
  return await prisma.cargo.delete({
    where: { id: parseInt(id) },
  });
};
