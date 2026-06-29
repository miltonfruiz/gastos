Aquí te dejo un ejemplo de controlador CRUD para un Administrador de Gastos Personales en JavaScript:

```javascript
class Gasto {
  constructor(id, fecha, descripcion, monto) {
    this.id = id;
    this.fecha = fecha;
    this.descripcion = descripcion;
    this.monto = monto;
  }
}

class GastosController {
  constructor() {
    this.gastos = [];
    this.id = 1;
  }

  // Crear un nuevo gasto
  crearGasto(fecha, descripcion, monto) {
    const gasto = new Gasto(this.id, fecha, descripcion, monto);
    this.gastos.push(gasto);
    this.id++;
    return gasto;
  }

  // Leer todos los gastos
  leerGastos() {
    return this.gastos;
  }

  // Leer un gasto por id
  leerGasto(id) {
    return this.gastos.find((gasto) => gasto.id === id);
  }

  // Actualizar un gasto
  actualizarGasto(id, fecha, descripcion, monto) {
    const gasto = this.leerGasto(id);
    if (gasto) {
      gasto.fecha = fecha;
      gasto.descripcion = descripcion;
      gasto.monto = monto;
      return gasto;
    } else {
      return null;
    }
  }

  // Eliminar un gasto
  eliminarGasto(id) {
    const index = this.gastos.findIndex((gasto) => gasto.id === id);
    if (index !== -1) {
      this.gastos.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}

// Ejemplo de uso
const controller = new GastosController();

// Crear un nuevo gasto
const gasto1 = controller.crearGasto("2024-09-16", "Alquiler", 1000);
console.log(gasto1);

// Leer todos los gastos
const gastos = controller.leerGastos();
console.log(gastos);

// Leer un gasto por id
const gasto = controller.leerGasto(1);
console.log(gasto);

// Actualizar un gasto
const gastoActualizado = controller.actualizarGasto(1, "2024-09-16", "Alquiler actualizado", 1200);
console.log(gastoActualizado);

// Eliminar un gasto
const eliminado = controller.eliminarGasto(1);
console.log(eliminado);
```

Este código define una clase `Gasto` para representar un gasto personal y una clase `GastosController` para gestionar los gastos. El controlador tiene métodos para crear, leer, actualizar y eliminar gastos. El ejemplo de uso al final muestra cómo utilizar el controlador para crear, leer, actualizar y eliminar gastos.