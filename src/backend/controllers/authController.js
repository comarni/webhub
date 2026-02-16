const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  createUser,
  findUserByEmail,
  findUserById,
  saveResetToken,
  findResetToken,
  updatePassword,
  markResetTokenUsed,
} = require("../models/userModel");

async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    if (!["developer", "company"].includes(role)) {
      return res.status(400).json({ message: "Rol inválido" });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = await createUser({ name, email, passwordHash, role });
    const user = await findUserById(userId);

    return res.status(201).json({ message: "Usuario creado", user });
  } catch (error) {
    return res.status(500).json({ message: "Error al registrar", error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son requeridos" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name, email: user.email },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login correcto",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email requerido" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.json({ message: "Si el correo existe, recibirás instrucciones" });
    }

    const token = crypto.randomBytes(24).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    await saveResetToken(user.id, token, expiresAt);

    return res.json({
      message: "Token de recuperación generado (modo demo)",
      resetToken: token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al recuperar contraseña", error: error.message });
  }
}

async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token y nueva contraseña requeridos" });
    }

    const resetRecord = await findResetToken(token);
    if (!resetRecord || resetRecord.used) {
      return res.status(400).json({ message: "Token inválido o ya usado" });
    }

    if (new Date(resetRecord.expires_at) < new Date()) {
      return res.status(400).json({ message: "Token expirado" });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await updatePassword(resetRecord.user_id, passwordHash);
    await markResetTokenUsed(resetRecord.id);

    return res.json({ message: "Contraseña actualizada" });
  } catch (error) {
    return res.status(500).json({ message: "Error al resetear contraseña", error: error.message });
  }
}

module.exports = { register, login, forgotPassword, resetPassword };
