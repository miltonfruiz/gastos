// Importar dependencias necesarias
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Configuración de la aplicación Express
const app = express();
app.use(express.json());

// Configuración de la clave secreta para JWT
const claveSecreta = 'miClaveSecreta';

// Base de datos de usuarios (simulada)
let usuarios = [
  { id: '1', nombre: 'Administrador', email: 'admin@example.com', password: bcrypt.hashSync('password123') },
];

// Base de datos de gastos personales (simulada)
let gastos = [
  { id: '1', descripcion: 'Gasto 1', monto: 100, fecha: '2022-01-01' },
  { id: '2', descripcion: 'Gasto 2', monto: 200, fecha: '2022-01-15' },
];

// Función para verificar token JWT
function verificarToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Acceso denegado. No se proporcionó token.');
  try {
    const decoded = jwt.verify(token, claveSecreta);
    req.usuario = decoded;
    next();
  } catch (ex) {
    return res.status(400).send('Token inválido.');
  }
}

// Ruta para registrar un nuevo usuario
app.post('/api/usuarios', (req, res) => {
  const { nombre, email, password } = req.body;
  const usuario = usuarios.find((u) => u.email === email);
  if (usuario) return res.status(400).send('El correo electrónico ya está registrado.');
  const nuevoUsuario = {
    id: uuidv4(),
    nombre,
    email,
    password: bcrypt.hashSync(password),
  };
  usuarios.push(nuevoUsuario);
  res.send(nuevoUsuario);
});

// Ruta para iniciar sesión
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario) return res.status(400).send('Correo electrónico o contraseña incorrectos.');
  const esValido = bcrypt.compareSync(password, usuario.password);
  if (!esValido) return res.status(400).send('Correo electrónico o contraseña incorrectos.');
  const token = jwt.sign({ id: usuario.id, email: usuario.email }, claveSecreta);
  res.send(token);
});

// Ruta protegida para obtener todos los gastos personales
app.get('/api/gastos', verificarToken, (req, res) => {
  res.send(gastos);
});

// Ruta protegida para obtener un gasto personal por ID
app.get('/api/gastos/:id', verificarToken, (req, res) => {
  const gasto = gastos.find((g) => g.id === req.params.id);
  if (!gasto) return res.status(404).send('Gasto no encontrado.');
  res.send(gasto);
});

// Ruta protegida para crear un nuevo gasto personal
app.post('/api/gastos', verificarToken, (req, res) => {
  const { descripcion, monto, fecha } = req.body;
  const nuevoGasto = {
    id: uuidv4(),
    descripcion,
    monto,
    fecha,
  };
  gastos.push(nuevoGasto);
  res.send(nuevoGasto);
});

// Ruta protegida para actualizar un gasto personal
app.put('/api/gastos/:id', verificarToken, (req, res) => {
  const gasto = gastos.find((g) => g.id === req.params.id);
  if (!gasto) return res.status(404).send('Gasto no encontrado.');
  const { descripcion, monto, fecha } = req.body;
  gasto.descripcion = descripcion;
  gasto.monto = monto;
  gasto.fecha = fecha;
  res.send(gasto);
});

// Ruta protegida para eliminar un gasto personal
app.delete('/api/gastos/:id', verificarToken, (req, res) => {
  const gasto = gastos.find((g) => g.id === req.params.id);
  if (!gasto) return res.status(404).send('Gasto no encontrado.');
  gastos = gastos.filter((g) => g.id !== req.params.id);
  res.send(gasto);
});

// Iniciar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});