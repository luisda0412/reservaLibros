import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { obtenerLibro, eliminarLibro } from '../api/apiJSON';

const DetallesLibroMantenimiento = () => {
  const { id } = useParams();
  const [libro, setLibro] = useState(null);
  const navigate = useNavigate();

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

  const handleEliminarClick = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      try {
        await eliminarLibro(id);
        navigate('/mantenimientoLibro'); // Redirige a la página principal después de eliminar el libro
      } catch (error) {
        console.error('Error al eliminar el libro:', error);
      }
    }
  };

  if (!libro) {
    return <p className="text-center mt-8">Cargando...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-3xl font-bold mb-5">{libro.titulo}</h2>
        <img
          src={libro.imagen} // Asegúrate de que libro.imagen tenga la URL correcta de la imagen del libro
          alt={libro.titulo}
          className="w-64 h-200 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-600 text-lg mb-2">Autor: {libro.autor}</p>
        <p className="text-gray-600 text-lg mb-2">Año: {libro.anio}</p>
        {/* Agrega más propiedades del libro aquí */}
        <div className="flex space-x-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
            onClick={handleEliminarClick}
          >
            Eliminar
          </button>
          <Link to={`/libroEditar/${libro.id}`} className="text-black text-lg">
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded">
              Editar
            </button>
          </Link>
          <Link to="/mantenimientoLibro" className="text-black text-lg">
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded">
              Volver
            </button>
          </Link>
        </div>
      </div>
      {/* Resto del contenido */}
    </div>
  );
};

export default DetallesLibroMantenimiento;
