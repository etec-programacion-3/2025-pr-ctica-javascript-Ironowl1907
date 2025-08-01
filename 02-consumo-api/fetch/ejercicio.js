// URL base de la API de productos
const BASE_URL = 'http://localhost:5000/api/products';

// Referencias a los elementos del DOM
const list = document.getElementById('product-list');
const form = document.getElementById('product-form');

// Obtiene y muestra la lista de productos desde la API (GET resuelto)
async function fetchProducts() {
  const res = await fetch(BASE_URL);
  const products = await res.json();
  list.innerHTML = '';
  products.forEach(prod => {
    const li = document.createElement('li');
    li.textContent = `${prod.name} - $${prod.price}`;
    // Llama a showDetails al hacer clic en el nombre del producto
    li.onclick = () => showDetails(prod.id);
    // Botón para eliminar
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.onclick = async e => {
      e.stopPropagation();
      // Llama a deleteProduct y luego fetchProducts
      await deleteProduct(prod.id);
      await fetchProducts();
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
}

// Función para crear un producto usando fetch POST
async function createProduct(name, price, description) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        price: parseFloat(price),
        description: description
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creando producto:', error);
    alert('Error al crear el producto');
  }
}

// Función para eliminar un producto usando fetch DELETE
async function deleteProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    console.log('Producto eliminado exitosamente');
  } catch (error) {
    console.error('Error eliminando producto:', error);
    alert('Error al eliminar el producto');
  }
}

// Función para mostrar detalles usando fetch GET /products/:id
async function showDetails(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const product = await response.json();

    // Muestra un alert con la información del producto
    alert(`Detalles del Producto:
    
Nombre: ${product.name}
Precio: $${product.price}
Descripción: ${product.description || 'Sin descripción'}
ID: ${product.id}`);

  } catch (error) {
    console.error('Error obteniendo detalles:', error);
    alert('Error al obtener los detalles del producto');
  }
}

// Maneja el submit del formulario para crear un producto
form.onsubmit = async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;

  // Llama a createProduct y luego fetchProducts
  await createProduct(name, price, description);
  await fetchProducts();

  form.reset();
};

// Render inicial
fetchProducts();
