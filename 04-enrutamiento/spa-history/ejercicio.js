// Referencia al contenedor principal de la SPA
const app = document.getElementById('app');

// Definición de rutas y sus vistas asociadas
const routes = {
  '/': () => '<h1>Inicio</h1><p>Bienvenido a la SPA.</p>',
  '/productos': () => '<h1>Productos</h1><p>Lista de productos aquí.</p>',
  '/contacto': () => '<h1>Contacto</h1><p>Formulario de contacto aquí.</p>',
  // Ruta para producto específico
  '/producto/1': () => `
    <h1>Producto #1</h1>
    <p>Detalles del producto #1</p>
    <ul>
      <li><strong>Nombre:</strong> Laptop Gaming</li>
      <li><strong>Precio:</strong> $1,299</li>
      <li><strong>Descripción:</strong> Laptop de alto rendimiento para gaming</li>
    </ul>
    <button onclick="navigate('/productos')">Volver a Productos</button>
  `
};

// Renderiza la vista correspondiente a la ruta actual
const render = route => {
  app.innerHTML = routes[route] ? routes[route]() : '<h1>404</h1><p>Página no encontrada.</p>';
};

// Cambia la ruta usando history.pushState y renderiza la nueva vista
const navigate = route => {
  window.history.pushState({}, '', route);
  render(route);
};

// Maneja los clics en la navegación para cambiar de vista sin recargar
// Usa delegación de eventos en el nav
// Actualiza la URL y la vista
document.querySelector('nav').addEventListener('click', e => {
  if (e.target.matches('button[data-route]')) {
    e.preventDefault(); // Previene el comportamiento por defecto
    navigate(e.target.dataset.route);
  }
});

// Maneja el evento popstate para soportar navegación con los botones del navegador
window.addEventListener('popstate', () => {
  render(window.location.pathname);
});

// Hacer navigate disponible globalmente para poder usarla desde el HTML generado
window.navigate = navigate;

// Render inicial según la ruta actual
render(window.location.pathname);
