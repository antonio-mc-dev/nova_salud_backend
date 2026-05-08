import {
  obtenerCargos,
  crearCargo,
  actualizarCargo,
  eliminarCargo,
} from './cargo.service.js';

export const getCargos = async (req, res) => {
  try {
    const cargos = await obtenerCargos();
    res.json({ ok: true, data: cargos });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const postCargo = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre) {
      return res.status(400).json({ ok: false, mensaje: 'El campo nombre es requerido' });
    }
    const cargo = await crearCargo(req.body);
    res.status(201).json({ ok: true, data: cargo });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const putCargo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    if (!nombre) {
      return res.status(400).json({ ok: false, mensaje: 'El campo nombre es requerido' });
    }
    const cargo = await actualizarCargo(id, req.body);
    res.json({ ok: true, data: cargo });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const deleteCargo = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarCargo(id);
    res.json({ ok: true, mensaje: 'Cargo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};
