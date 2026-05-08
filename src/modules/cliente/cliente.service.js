import prisma from '../../config/db.js';

export const obtenerClientes = async () => {
  return await prisma.cliente.findMany({
    select: {
      id: true,
      nombre: true,
      apellido: true,
      dni: true,
      ruc: true,
      telefono: true,
      email: true,
      direccion: true,
    },
  });
};

export const obtenerClientePorDocumento = async (documento) => {
  return await prisma.cliente.findFirst({
    where: {
      OR: [
        { dni: documento },
        { ruc: documento },
      ],
    },
  });
};

export const crearCliente = async (data) => {
  return await prisma.cliente.create({
    data: {
      nombre: data.nombre,
      apellido: data.apellido,
      dni: data.dni,
      ruc: data.ruc,
      telefono: data.telefono,
      email: data.email,
      direccion: data.direccion,
    },
  });
};

export const actualizarCliente = async (id, data) => {
  return await prisma.cliente.update({
    where: { id: parseInt(id) },
    data: {
      nombre: data.nombre,
      apellido: data.apellido,
      dni: data.dni,
      ruc: data.ruc,
      telefono: data.telefono,
      email: data.email,
      direccion: data.direccion,
    },
  });
};

export const eliminarCliente = async (id) => {
  return await prisma.cliente.delete({
    where: { id: parseInt(id) },
  });
};
