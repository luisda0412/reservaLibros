const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const libros = [
  { id: 1, titulo: 'Libro 1', autor: 'Autor 1' },
  { id: 2, titulo: 'Libro 2', autor: 'Autor 2' },
  { id: 3, titulo: 'Libro 3', autor: 'Autor 3' },
  // Agrega más libros según sea necesario
];

app.use(cors());

app.get('/api/libros', (req, res) => {
  res.json(libros);
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Hubo un error en el servidor.' });
});

app.listen(port, () => {
  console.log(`Servidor API iniciado en el puerto ${port}`);
});
