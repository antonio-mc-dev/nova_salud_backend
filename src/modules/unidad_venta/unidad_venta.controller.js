import {
  obtenerUnidadesVenta,
  crearUnidadVenta,
  actualizarUnidadVenta,
  eliminarUnidadVenta,
} from './unidad_venta.service.js';

export const getUnidadesVenta = async (req, res) => {
  try {
    const unidades = await obtenerUnidadesVenta();
    res.json({ ok: true, data: unidades });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const postUnidadVenta = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ ok: false, mensaje: 'El campo nombre es requerido' });
    }
    const unidad = await crearUnidadVenta(req.body);
    res.status(201).json({ ok: true, data: unidad });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const putUnidadVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ ok: false, mensaje: 'El campo nombre es requerido' });
    }
    const unidad = await actualizarUnidadVenta(id, req.body);
    res.json({ ok: true, data: unidad });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const deleteUnidadVenta = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarUnidadVenta(id);
    res.json({ ok: true, mensaje: 'Unidad de venta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};
