import {
  obtenerClientes,
  obtenerClientePorDocumento,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
} from './cliente.service.js';

export const getClientes = async (req, res) => {
  try {
    const clientes = await obtenerClientes();
    res.json({ ok: true, data: clientes });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const getClientePorDocumento = async (req, res) => {
  try {
    const { dni } = req.params; // Using :dni in the route to match standard request, though it searches RUC too
    const cliente = await obtenerClientePorDocumento(dni);
    if (!cliente) {
      return res.status(404).json({ ok: false, mensaje: 'Cliente no encontrado' });
    }
    res.json({ ok: true, data: cliente });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const postCliente = async (req, res) => {
  try {
    const { nombre, apellido } = req.body;
    if (!nombre || !apellido) {
      return res.status(400).json({ ok: false, mensaje: 'El nombre y apellido son requeridos' });
    }
    const cliente = await crearCliente(req.body);
    res.status(201).json({ ok: true, data: cliente });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const putCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido } = req.body;
    if (!nombre || !apellido) {
      return res.status(400).json({ ok: false, mensaje: 'El nombre y apellido son requeridos' });
    }
    const cliente = await actualizarCliente(id, req.body);
    res.json({ ok: true, data: cliente });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarCliente(id);
    res.json({ ok: true, mensaje: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};
