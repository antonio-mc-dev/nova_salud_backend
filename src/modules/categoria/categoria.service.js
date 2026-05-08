import prisma from '../../config/db.js';

export const obtenerCategorias = async () => {
  return await prisma.categoria.findMany({
    select: {
      id: true,
      nombre: true,
      descripcion: true,
    },
  });
};

export const crearCategoria = async (data) => {
  return await prisma.categoria.create({
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
    },
  });
};

export const actualizarCategoria = async (id, data) => {
  return await prisma.categoria.update({
    where: { id: parseInt(id) },
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
    },
  });
};

export const eliminarCategoria = async (id) => {
  return await prisma.categoria.delete({
    where: { id: parseInt(id) },
  });
};
