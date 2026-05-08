import prisma from '../../config/db.js';

export const obtenerLaboratorios = async () => {
  return await prisma.laboratorio.findMany({
    select: {
      id: true,
      nombre: true,
      pais: true,
      telefono: true,
      email: true,
      activo: true,
    },
  });
};

export const crearLaboratorio = async (data) => {
  return await prisma.laboratorio.create({
    data: {
      nombre: data.nombre,
      pais: data.pais,
      telefono: data.telefono,
      email: data.email,
    },
  });
};

export const actualizarLaboratorio = async (id, data) => {
  return await prisma.laboratorio.update({
    where: { id: parseInt(id) },
    data: {
      nombre: data.nombre,
      pais: data.pais,
      telefono: data.telefono,
      email: data.email,
    },
  });
};

export const actualizarEstadoLaboratorio = async (id, activo) => {
  return await prisma.laboratorio.update({
    where: { id: parseInt(id) },
    data: { activo },
  });
};

export const eliminarLaboratorio = async (id) => {
  return await prisma.laboratorio.delete({
    where: { id: parseInt(id) },
  });
};
