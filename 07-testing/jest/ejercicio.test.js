// Ejercicio: pruebas unitarias con Jest

// Función suma ya implementada
function suma(a, b) {
  return a + b;
}

// EJERCICIO: Implementa la función totalCarrito que reciba un array de productos y devuelva el total
function totalCarrito(carrito) {
  // Si el carrito está vacío o no es un array, retorna 0
  if (!Array.isArray(carrito) || carrito.length === 0) {
    return 0;
  }

  // Suma todos los precios de los productos en el carrito
  return carrito.reduce((total, producto) => {
    // Verifica que el producto tenga la propiedad precio y sea un número
    if (producto && typeof producto.precio === 'number') {
      return total + producto.precio;
    }
    return total;
  }, 0);
}

// Función adicional para calcular total con cantidad
function totalCarritoConCantidad(carrito) {
  if (!Array.isArray(carrito) || carrito.length === 0) {
    return 0;
  }

  return carrito.reduce((total, producto) => {
    if (producto && typeof producto.precio === 'number') {
      const cantidad = producto.cantidad || 1;
      return total + (producto.precio * cantidad);
    }
    return total;
  }, 0);
}

// Tests existentes para la función suma
test('suma 2 + 2 es 4', () => {
  expect(suma(2, 2)).toBe(4);
});

test('suma -1 + 1 es 0', () => {
  expect(suma(-1, 1)).toBe(0);
});

// EJERCICIO: Tests para totalCarrito
describe('totalCarrito', () => {
  test('calcula el total de un carrito con un producto', () => {
    const carrito = [
      { nombre: 'Laptop', precio: 1000 }
    ];
    expect(totalCarrito(carrito)).toBe(1000);
  });

  test('calcula el total de un carrito con múltiples productos', () => {
    const carrito = [
      { nombre: 'Laptop', precio: 1000 },
      { nombre: 'Mouse', precio: 50 },
      { nombre: 'Teclado', precio: 100 }
    ];
    expect(totalCarrito(carrito)).toBe(1150);
  });

  test('retorna 0 para un carrito vacío', () => {
    expect(totalCarrito([])).toBe(0);
  });

  test('retorna 0 para un carrito undefined o null', () => {
    expect(totalCarrito(undefined)).toBe(0);
    expect(totalCarrito(null)).toBe(0);
  });

  test('ignora productos sin precio o con precio inválido', () => {
    const carrito = [
      { nombre: 'Laptop', precio: 1000 },
      { nombre: 'Mouse' }, // sin precio
      { nombre: 'Teclado', precio: 'gratis' }, // precio inválido
      { nombre: 'Monitor', precio: 300 }
    ];
    expect(totalCarrito(carrito)).toBe(1300);
  });

  test('maneja precios decimales correctamente', () => {
    const carrito = [
      { nombre: 'Café', precio: 4.50 },
      { nombre: 'Sandwich', precio: 8.75 }
    ];
    expect(totalCarrito(carrito)).toBeCloseTo(13.25);
  });
});

// Tests adicionales para totalCarritoConCantidad
describe('totalCarritoConCantidad', () => {
  test('calcula el total considerando cantidades', () => {
    const carrito = [
      { nombre: 'Laptop', precio: 1000, cantidad: 2 },
      { nombre: 'Mouse', precio: 50, cantidad: 3 }
    ];
    expect(totalCarritoConCantidad(carrito)).toBe(2150);
  });

  test('usa cantidad 1 por defecto si no se especifica', () => {
    const carrito = [
      { nombre: 'Laptop', precio: 1000 }, // sin cantidad
      { nombre: 'Mouse', precio: 50, cantidad: 2 }
    ];
    expect(totalCarritoConCantidad(carrito)).toBe(1100);
  });

  test('maneja cantidad 0', () => {
    const carrito = [
      { nombre: 'Laptop', precio: 1000, cantidad: 0 },
      { nombre: 'Mouse', precio: 50, cantidad: 1 }
    ];
    expect(totalCarritoConCantidad(carrito)).toBe(50);
  });
});

// Tests de casos edge adicionales
describe('Casos extremos', () => {
  test('totalCarrito maneja carrito con productos mezclados', () => {
    const carrito = [
      { nombre: 'Producto válido', precio: 100 },
      null, // producto null
      { nombre: 'Sin precio' },
      { precio: 50 }, // sin nombre pero con precio válido
      { nombre: 'Precio negativo', precio: -10 }
    ];
    expect(totalCarrito(carrito)).toBe(140); // 100 + 50 + (-10)
  });

  test('suma maneja números decimales', () => {
    expect(suma(0.1, 0.2)).toBeCloseTo(0.3);
  });

  test('suma maneja números grandes', () => {
    expect(suma(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER + 1);
  });
});

// Exportar funciones para uso en otros archivos (si es necesario)
module.exports = {
  suma,
  totalCarrito,
  totalCarritoConCantidad
};
