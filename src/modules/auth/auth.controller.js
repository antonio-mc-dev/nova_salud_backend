import { login, register } from "./auth.service.js";

export const loginController = async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    if (!email || !contrasena) {
      return res
        .status(400)
        .json({ ok: false, mensaje: "Email y contraseña son requeridos" });
    }

    const data = await login(email, contrasena);
    res.json({ ok: true, ...data });
  } catch (error) {
    res.status(401).json({ ok: false, mensaje: error.message });
  }
};

export const registerController = async (req, res) => {
  try {
    const { nombre, apellido, dni, email, telefono, contrasena } = req.body;

    if (!nombre || !apellido || !dni || !email || !contrasena) {
      return res
        .status(400)
        .json({ ok: false, mensaje: "Faltan campos requeridos" });
    }

    const empleado = await register({
      nombre,
      apellido,
      dni,
      email,
      telefono,
      contrasena,
    });
    res.status(201).json({ ok: true, data: empleado });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
};
