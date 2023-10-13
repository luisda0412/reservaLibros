import React, { useState } from 'react';
import { nuevoLibro } from '../api/apiJSON';
import { useNavigate } from 'react-router-dom';
import Error from './Error';

const NuevoLibro = () => {
  const [libro, setLibro] = useState({
    titulo: '',
    autor: '',
    anio: '',
    estado: 1,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { titulo, autor, anio } = libro;

  const handleChange = (e) => {
    setLibro({
      ...libro,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (!titulo || !autor || !anio) {
      setError('Todos los campos son obligatorios.');
      // Después de 2 segundos, limpiar el mensaje de error
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }

    // Lógica para agregar un nuevo libro (reemplaza con tu propia lógica)
    await nuevoLibro(libro);

    // Redirige a la página de mantenimiento de libros después de agregar el libro
    navigate('/mantenimientoLibro');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600 text-center">Agregar un nuevo libro</h2>
      {error && <Error>{error}</Error>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-sm text-gray-700 uppercase font-bold">
            Nombre del Libro
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={titulo}
            onChange={handleChange}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Titulo del libro"
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
            value={autor}
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
            value={anio}
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
          Agregar Libro
        </button>
      </form>
    </div>
  );
};

export default NuevoLibro;
