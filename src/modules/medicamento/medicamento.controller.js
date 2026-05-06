import {
  obtenerMedicamentos,
  crearMedicamento,
} from "./medicamento.service.js";

export const getMedicamentos = async (req, res) => {
  try {
    const medicamentos = await obtenerMedicamentos();
    res.json({ ok: true, data: medicamentos });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const postMedicamento = async (req, res) => {
  try {
    const {
      nombre,
      principio_activo,
      descripcion,
      laboratorio_id,
      categoria_id,
      presentacion_id,
      precios,
    } = req.body;

    if (
      !nombre ||
      !laboratorio_id ||
      !categoria_id ||
      !presentacion_id ||
      !precios?.length
    ) {
      return res
        .status(400)
        .json({ ok: false, mensaje: "Faltan campos requeridos" });
    }

    const medicamento = await crearMedicamento(req.body);
    res.status(201).json({ ok: true, data: medicamento });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};
