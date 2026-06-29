const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir esquema para la categoría de gasto
const categoriaSchema = new Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String }
});

// Definir esquema para el gasto
const gastoSchema = new Schema({
  categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
  fecha: { type: Date, required: true, default: Date.now },
  monto: { type: Number, required: true },
  descripcion: { type: String }
});

// Definir esquema para el usuario (administrador de gastos personales)
const usuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gastos: [{ type: Schema.Types.ObjectId, ref: 'Gasto' }]
});

// Definir modelo para la categoría de gasto
const Categoria = mongoose.model('Categoria', categoriaSchema);

// Definir modelo para el gasto
const Gasto = mongoose.model('Gasto', gastoSchema);

// Definir modelo para el usuario (administrador de gastos personales)
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Exportar modelos
module.exports = { Categoria, Gasto, Usuario };