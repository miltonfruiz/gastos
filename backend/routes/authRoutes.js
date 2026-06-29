// authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ nombre, email, password: hashedPassword });
    await nuevoUsuario.save();
    res.json({ mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar el usuario' });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
    const isValidPassword = await bcrypt.compare(password, usuario.password);
    if (!isValidPassword) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ userId: usuario._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
});

// Cierre de sesión
router.post('/logout', async (req, res) => {
  try {
    req.session.destroy();
    res.json({ mensaje: 'Sesión cerrada con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cerrar la sesión' });
  }
});

module.exports = router;