import {
  obtenerLaboratorios,
  crearLaboratorio,
  actualizarLaboratorio,
  actualizarEstadoLaboratorio,
  eliminarLaboratorio,
} from './laboratorio.service.js';

export const getLaboratorios = async (req, res) => {
  try {
    const laboratorios = await obtenerLaboratorios();
    res.json({ ok: true, data: laboratorios });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const postLaboratorio = async (req, res) => {
  try {
    const { nombre, pais, telefono, email } = req.body;
    if (!nombre || !pais) {
      return res.status(400).json({ ok: false, mensaje: 'Faltan campos requeridos (nombre, pais)' });
    }
    const laboratorio = await crearLaboratorio(req.body);
    res.status(201).json({ ok: true, data: laboratorio });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const putLaboratorio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, pais, telefono, email } = req.body;
    if (!nombre || !pais) {
      return res.status(400).json({ ok: false, mensaje: 'Faltan campos requeridos (nombre, pais)' });
    }
    const laboratorio = await actualizarLaboratorio(id, req.body);
    res.json({ ok: true, data: laboratorio });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const patchLaboratorio = async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;
    if (activo === undefined) {
      return res.status(400).json({ ok: false, mensaje: 'El campo activo es requerido' });
    }
    const laboratorio = await actualizarEstadoLaboratorio(id, activo);
    res.json({ ok: true, data: laboratorio });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const deleteLaboratorio = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarLaboratorio(id);
    res.json({ ok: true, mensaje: 'Laboratorio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};
