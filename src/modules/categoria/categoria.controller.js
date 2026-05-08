import {
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from './categoria.service.js';

export const getCategorias = async (req, res) => {
  try {
    const categorias = await obtenerCategorias();
    res.json({ ok: true, data: categorias });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const postCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre) {
      return res.status(400).json({ ok: false, mensaje: 'El campo nombre es requerido' });
    }
    const categoria = await crearCategoria(req.body);
    res.status(201).json({ ok: true, data: categoria });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const putCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    if (!nombre) {
      return res.status(400).json({ ok: false, mensaje: 'El campo nombre es requerido' });
    }
    const categoria = await actualizarCategoria(id, req.body);
    res.json({ ok: true, data: categoria });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarCategoria(id);
    res.json({ ok: true, mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};
