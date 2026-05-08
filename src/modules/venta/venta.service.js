import prisma from '../../config/db.js';

export const obtenerVentas = async () => {
  return await prisma.comprobante.findMany({
    include: {
      tipo_comprobante: { select: { nombre: true } },
      cliente: { select: { nombre: true, apellido: true, dni: true, ruc: true } },
      empleado: { select: { nombre: true, apellido: true } },
    },
    orderBy: { fecha: 'desc' }
  });
};

export const obtenerVentaPorId = async (id) => {
  return await prisma.comprobante.findUnique({
    where: { id: parseInt(id) },
    include: {
      tipo_comprobante: { select: { nombre: true } },
      cliente: { select: { nombre: true, apellido: true, dni: true, ruc: true } },
      empleado: { select: { nombre: true, apellido: true } },
      detalle_venta: {
        include: {
          medicamento_precio: {
            include: {
              medicamento: { select: { nombre: true } },
              unidad_venta: { select: { nombre: true } }
            }
          }
        }
      }
    },
  });
};

export const crearVenta = async (data, empleado_id) => {
  const { tipo_comprobante_id, cliente_id, items } = data;

  return await prisma.$transaction(async (tx) => {
    let total = 0;
    const detallesParaInsertar = [];

    // Validar stock y preparar subtotales
    for (const item of items) {
      const medPrecio = await tx.medicamento_precio.findUnique({
        where: { id: item.medicamento_precio_id }
      });

      if (!medPrecio) {
        throw new Error(`Medicamento con precio ID ${item.medicamento_precio_id} no encontrado`);
      }

      if (medPrecio.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para el ID ${item.medicamento_precio_id}. Stock actual: ${medPrecio.stock}`);
      }

      const subtotal = item.cantidad * item.precio_unitario;
      total += subtotal;

      detallesParaInsertar.push({
        medicamento_precio_id: item.medicamento_precio_id,
        cantidad: item.cantidad,
        precio_unitario: item.precio_unitario,
        subtotal
      });
    }

    const igv = total * 0.18;

    // Generar serie y número
    const serie = tipo_comprobante_id === 1 ? 'B001' : 'F001';
    
    const maxComprobante = await tx.comprobante.aggregate({
      where: { serie },
      _max: { numero: true }
    });
    const numero = (maxComprobante._max.numero || 0) + 1;

    // Crear la venta
    const comprobante = await tx.comprobante.create({
      data: {
        serie,
        numero,
        tipo_comprobante_id,
        cliente_id,
        empleado_id,
        igv,
        total,
        detalle_venta: {
          create: detallesParaInsertar
        }
      },
      include: {
        tipo_comprobante: { select: { nombre: true } },
        cliente: { select: { nombre: true, apellido: true, dni: true, ruc: true, direccion: true } },
        empleado: { select: { nombre: true, apellido: true } },
        detalle_venta: {
          include: {
            medicamento_precio: {
              include: {
                medicamento: { select: { nombre: true } },
                unidad_venta: { select: { nombre: true } }
              }
            }
          }
        }
      }
    });

    // Descontar stock
    for (const item of items) {
      await tx.medicamento_precio.update({
        where: { id: item.medicamento_precio_id },
        data: {
          stock: {
            decrement: item.cantidad
          }
        }
      });
    }

    return comprobante;
  });
};
