import prisma from '../../config/db.js';

export const obtenerUnidadesVenta = async () => {
  return await prisma.unidad_venta.findMany({
    select: {
      id: true,
      nombre: true,
    },
  });
};

export const crearUnidadVenta = async (data) => {
  return await prisma.unidad_venta.create({
    data: {
      nombre: data.nombre,
    },
  });
};

export const actualizarUnidadVenta = async (id, data) => {
  return await prisma.unidad_venta.update({
    where: { id: parseInt(id) },
    data: {
      nombre: data.nombre,
    },
  });
};

export const eliminarUnidadVenta = async (id) => {
  return await prisma.unidad_venta.delete({
    where: { id: parseInt(id) },
  });
};
