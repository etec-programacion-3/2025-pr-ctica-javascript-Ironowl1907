// Componente Tarjeta: genera un elemento visual para mostrar información
export function Tarjeta({ titulo, contenido }) {
  const div = document.createElement('div');
  div.className = 'tarjeta';
  div.innerHTML = `<h2>${titulo}</h2><p>${contenido}</p>`;

  // Agregar algunos estilos básicos inline
  div.style.cssText = `
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin: 8px 0;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  `;

  return div;
}

// Componente Formulario: genera un formulario reutilizable
export function Formulario({ onSubmit }) {
  const form = document.createElement('form');
  form.className = 'formulario';

  form.innerHTML = `
    <div style="margin-bottom: 12px;">
      <label for="titulo" style="display: block; margin-bottom: 4px; font-weight: bold;">Título:</label>
      <input type="text" id="titulo" name="titulo" required 
             style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
    </div>
    <div style="margin-bottom: 12px;">
      <label for="contenido" style="display: block; margin-bottom: 4px; font-weight: bold;">Contenido:</label>
      <textarea id="contenido" name="contenido" rows="3" required
                style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; resize: vertical;"></textarea>
    </div>
    <button type="submit" 
            style="background-color: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">
      Agregar Tarjeta
    </button>
  `;

  // Agregar estilos al formulario
  form.style.cssText = `
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    margin-bottom: 20px;
  `;

  // Manejar el evento submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const dato = {
      titulo: formData.get('titulo'),
      contenido: formData.get('contenido')
    };

    // Llamar al callback pasado como parámetro
    if (onSubmit) {
      onSubmit(dato);
    }

    // Limpiar el formulario después del envío
    form.reset();
  });

  return form;
}

// Montaje de componentes en la página
const app = document.getElementById('app');

// Función mostrarTarjeta que recibe un dato y agrega una tarjeta al DOM
function mostrarTarjeta(dato) {
  const nuevaTarjeta = Tarjeta({
    titulo: dato.titulo,
    contenido: dato.contenido
  });

  // Agregar la nueva tarjeta al contenedor
  app.appendChild(nuevaTarjeta);
}

// Montar el formulario en la página y pasarle la función mostrarTarjeta como callback
app.appendChild(Formulario({ onSubmit: mostrarTarjeta }));
