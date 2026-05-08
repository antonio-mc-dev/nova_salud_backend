import {
  obtenerVentas,
  obtenerVentaPorId,
  crearVenta,
} from './venta.service.js';

export const getVentas = async (req, res) => {
  try {
    const ventas = await obtenerVentas();
    res.json({ ok: true, data: ventas });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const getVentaById = async (req, res) => {
  try {
    const { id } = req.params;
    const venta = await obtenerVentaPorId(id);
    if (!venta) {
      return res.status(404).json({ ok: false, mensaje: 'Venta no encontrada' });
    }
    res.json({ ok: true, data: venta });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const postVenta = async (req, res) => {
  try {
    const empleado_id = req.empleado.id;
    const { tipo_comprobante_id, cliente_id, items } = req.body;

    if (!tipo_comprobante_id || !cliente_id || !items || !items.length) {
      return res.status(400).json({ ok: false, mensaje: 'Faltan campos requeridos (tipo_comprobante_id, cliente_id, items)' });
    }

    const venta = await crearVenta(req.body, empleado_id);
    res.status(201).json({ ok: true, data: venta });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
};
