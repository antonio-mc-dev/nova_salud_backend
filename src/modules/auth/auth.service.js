import prisma from "../../config/db.js";
import bcrypt from "bcryptjs";
import { generarToken } from "../../utils/jwt.js";

export const login = async (email, contrasena) => {
  const empleado = await prisma.empleado.findUnique({
    where: { email },
    select: {
      id: true,
      nombre: true,
      apellido: true,
      email: true,
      contrasena: true,
      activo: true,
      cargo: { select: { nombre: true } },
    },
  });

  if (!empleado) throw new Error("Credenciales inválidas");
  if (!empleado.activo) throw new Error("Usuario inactivo");

  const passwordValido = await bcrypt.compare(contrasena, empleado.contrasena);
  if (!passwordValido) throw new Error("Credenciales inválidas");

  const token = generarToken({
    id: empleado.id,
    nombre: empleado.nombre,
    email: empleado.email,
    cargo: empleado.cargo.nombre,
  });

  return {
    token,
    empleado: {
      id: empleado.id,
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      email: empleado.email,
      cargo: empleado.cargo.nombre,
    },
  };
};

export const register = async (datos) => {
  const { nombre, apellido, dni, email, telefono, contrasena, cargo_id } =
    datos;

  const existe = await prisma.empleado.findFirst({
    where: {
      OR: [{ email }, { dni }],
    },
  });

  if (existe) {
    throw new Error("Ya existe un empleado con ese email o DNI");
  }

  const hash = await bcrypt.hash(contrasena, 10);

  const empleado = await prisma.empleado.create({
    data: {
      nombre,
      apellido,
      dni,
      email,
      telefono,
      contrasena: hash,
      cargo_id: cargo_id || 3, // Cajero por defecto
    },
    select: {
      id: true,
      nombre: true,
      apellido: true,
      email: true,
      cargo: {
        select: { nombre: true },
      },
    },
  });

  return empleado;
};
