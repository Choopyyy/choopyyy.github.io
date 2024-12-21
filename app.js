function searchBooks() {
    const query = document.getElementById('searchQuery').value;
  
    // Si el campo de búsqueda está vacío, se muestra un mensaje.
    if (!query) {
      alert('Por favor, ingresa un término de búsqueda');
      return;
    }
  
    // Construi la URL de la API con el término de búsqueda.
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  
    // Uso fetch para hacer la solicitud.
    fetch(url)
      .then(response => {
        // Compruebo si la respuesta fue exitosa (status 200).
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        // Proceso los resultados y los muestro.
        const books = data.items;
        let output = '<h2>Resultados de búsqueda:</h2>';
        if (books) {
          books.forEach(book => {
            const title = book.volumeInfo.title;
            const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Autor no disponible';
            const imageUrl = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=Sin+Imagen';
  
            output += `
              <div>
                <img src="${imageUrl}" alt="${title}" />
                <h3>${title}</h3>
                <p><strong>Autor(es):</strong> ${author}</p>
              </div>
            `;
          });
        } else {
          output = '<p>No se encontraron resultados.</p>';
        }
        document.getElementById('results').innerHTML = output;
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('results').innerHTML = '<p>Error al obtener los datos. Por favor, intenta nuevamente.</p>';
      });
  }
  