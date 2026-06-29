const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authController = {
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json({ message: 'Por favor, rellena todos los campos.' });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ username, email, password: hashedPassword });
            const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

            res.status(201).json({ token, user: { id: newUser._id, username: newUser.username, email: newUser.email } });
        } catch (error) {
            res.status(500).json({ message: 'Error al registrar al usuario.' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Por favor, rellena todos los campos.' });
            }

            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return res.status(401).json({ message: 'Credenciales inválidas.' });
            }

            const isValidPassword = await bcrypt.compare(password, existingUser.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Credenciales inválidas.' });
            }

            const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ token, user: { id: existingUser._id, username: existingUser.username, email: existingUser.email } });
        } catch (error) {
            res.status(500).json({ message: 'Error al iniciar sesión.' });
        }
    },

    logout: async (req, res) => {
        try {
            res.status(200).json({ message: 'Sesión cerrada correctamente.' });
        } catch (error) {
            res.status(500).json({ message: 'Error al cerrar la sesión.' });
        }
    }
};

module.exports = authController;