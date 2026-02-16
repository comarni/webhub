async function registerUser(formData) {
  const db = getDb();
  const { name, email, password, role } = formData;

  if (!name || !email || !password || !role) {
    throw new Error("Faltan campos requeridos");
  }
  if (!["developer", "company"].includes(role)) {
    throw new Error("Rol inválido");
  }
  if (!validatePassword(password)) {
    throw new Error("La contraseña debe tener al menos 6 caracteres");
  }
  if (db.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("Ese correo ya está registrado");
  }

  const newUser = {
    id: nextId(db.users),
    name,
    email,
    password,
    role,
    title: role === "developer" ? "Nuevo perfil" : undefined,
    bio: role === "developer" ? "" : undefined,
    experienceYears: role === "developer" ? 0 : undefined,
    cvUrl: role === "developer" ? "" : undefined,
    skills: role === "developer" ? [] : undefined,
    companyDescription: role === "company" ? "" : undefined,
  };

  db.users.push(newUser);
  setDb(db);
  return { user: newUser };
}

async function loginUser(formData) {
  const db = getDb();
  const { email, password } = formData;
  const user = db.users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
  if (!user || user.password !== password) {
    throw new Error("Credenciales inválidas");
  }
  return { user };
}

async function forgotPassword(formData) {
  const db = getDb();
  const { email } = formData;
  const user = db.users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
  if (!user) {
    return { message: "Si el correo existe, recibirás instrucciones" };
  }

  const token = Math.random().toString(36).slice(2, 10).toUpperCase();
  db.passwordResets.push({
    id: nextId(db.passwordResets),
    userId: user.id,
    token,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    used: false,
  });
  setDb(db);
  return { message: "Token generado", resetToken: token };
}

async function resetPassword(formData) {
  const db = getDb();
  const { token, newPassword } = formData;
  if (!validatePassword(newPassword)) {
    throw new Error("La contraseña debe tener al menos 6 caracteres");
  }

  const reset = db.passwordResets.find((r) => r.token === token && !r.used);
  if (!reset) {
    throw new Error("Token inválido");
  }
  if (new Date(reset.expiresAt) < new Date()) {
    throw new Error("Token expirado");
  }

  const user = db.users.find((u) => u.id === reset.userId);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  user.password = newPassword;
  reset.used = true;
  setDb(db);
  return { message: "Contraseña actualizada" };
}
