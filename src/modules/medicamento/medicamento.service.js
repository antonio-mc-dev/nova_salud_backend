import prisma from "../../config/db.js";

export const obtenerMedicamentos = async () => {
  return await prisma.medicamento.findMany({
    where: { activo: true },
    select: {
      id: true,
      nombre: true,
      principio_activo: true,
      laboratorio: { select: { nombre: true } },
      categoria: { select: { nombre: true } },
      presentacion: { select: { nombre: true } },
      medicamento_precio: {
        select: {
          id: true,
          precio: true,
          stock: true,
          unidad_venta: { select: { nombre: true } },
        },
      },
    },
  });
};

export const crearMedicamento = async (datos) => {
  const { nombre, principio_activo, descripcion, laboratorio_id, categoria_id, presentacion_id, precios } = datos

  return await prisma.medicamento.create({
    data: {
      nombre,
      principio_activo,
      descripcion,
      laboratorio_id,
      categoria_id,
      presentacion_id,
      medicamento_precio: {
        create: precios.map(p => ({
          unidad_venta_id: p.unidad_venta_id,
          precio: p.precio,
          stock: p.stock
        }))
      }
    },
    select: {
      id: true,
      nombre: true,
      principio_activo: true,
      laboratorio: { select: { nombre: true } },
      categoria: { select: { nombre: true } },
      presentacion: { select: { nombre: true } },
      medicamento_precio: {
        select: {
          id: true,
          precio: true,
          stock: true,
          unidad_venta: { select: { nombre: true } }
        }
      }
    }
  })
}