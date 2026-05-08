import {
  obtenerPresentaciones,
  crearPresentacion,
  actualizarPresentacion,
  eliminarPresentacion,
} from './presentacion.service.js';

export const getPresentaciones = async (req, res) => {
  try {
    const presentaciones = await obtenerPresentaciones();
    res.json({ ok: true, data: presentaciones });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const postPresentacion = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ ok: false, mensaje: 'El campo nombre es requerido' });
    }
    const presentacion = await crearPresentacion(req.body);
    res.status(201).json({ ok: true, data: presentacion });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const putPresentacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ ok: false, mensaje: 'El campo nombre es requerido' });
    }
    const presentacion = await actualizarPresentacion(id, req.body);
    res.json({ ok: true, data: presentacion });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const deletePresentacion = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarPresentacion(id);
    res.json({ ok: true, mensaje: 'Presentación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};
