import { Router } from "express";
import { userModel } from "../daos/mongodb/models/userModel.js";
import { createHash } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import passport from "passport";

const router =  Router();

router.post(
  "/login", 
  passport.authenticate("login", { 
    session: false, 
    failureRedirect: "/api/auth/login", 
}), 
async (req, res) => {
  const payload = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    role: req.user.role,
  };

  const token = generateToken(payload);

  res.cookie("token", token, {
    maxAge: 100000,
    httpOnly: true,
  });

  res.status(200).json({
    message: "Sesión iniciada",
    token,
  })
});

router.get("/login", (req, res) => {
  res.status(401).json({ 
    error: "No se pudo iniciar sesión",
  });
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, role, password } = req.body;

  if (!first_name || !last_name || !email || !age || !role || !password) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  try {
    const hashPassword = await createHash(password);

    const user = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      role,
      password: hashPassword,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el usuario", details: error.message });
  }
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.status(200).json({
      message: "Bienvenido",
      user: req.user,
    });
  }
);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Sesión cerrada",
  });
});

export default router;
