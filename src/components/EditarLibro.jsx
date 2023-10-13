import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerLibro, editarLibro } from '../api/apiJSON';

const EditarLibro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libro, setLibro] = useState({
    titulo: '',
    autor: '',
    anio: '',
    imagen: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const libroObtenido = await obtenerLibro(id);
        setLibro(libroObtenido);
      } catch (error) {
        console.error('Error al obtener el libro:', error);
      }
    };

    fetchLibro();
  }, [id]);

  const handleChange = (e) => {
    setLibro({
      ...libro,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que todos los campos estén llenos
    if (!libro.titulo || !libro.autor || !libro.anio) {
      setError('Todos los campos son obligatorios.');
      // Después de 2 segundos, limpiar el mensaje de error
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }

    await editarLibro(libro); // Lógica para editar el libro en la API

    // Redirige a la página de detalles del libro después de la edición
    navigate(`/libroMantenimiento/${id}`);
  };

  if (!libro) {
    return <p className="text-center mt-8">Cargando...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-5 text-center">Editar Libro</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-sm text-gray-700 uppercase font-bold">
            Nombre del Libro
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={libro.titulo}
            onChange={handleChange}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Título del libro"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="autor" className="block text-sm text-gray-700 uppercase font-bold">
            Autor
          </label>
          <input
            type="text"
            id="autor"
            name="autor"
            value={libro.autor}
            onChange={handleChange}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre del autor"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="anio" className="block text-sm text-gray-700 uppercase font-bold">
            Año de Publicación
          </label>
          <input
            type="text"
            id="anio"
            name="anio"
            value={libro.anio}
            onChange={handleChange}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Año de publicación del libro"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imagen" className="block text-sm text-gray-700 uppercase font-bold">
            Imagen del Libro
          </label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleChange}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer rounded transition-all"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default EditarLibro;
