import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { obtenerLibros } from '../api/apiJSON';
import { UsuarioContext } from '../hooks/UsuarioContext';

const PaginaPrincipal = () => {
  const [libros, setLibros] = useState([]);
  const { usuario } = useContext(UsuarioContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const librosObtenidos = await obtenerLibros();
        setLibros(librosObtenidos);
      } catch (error) {
        console.error('Error al obtener libros:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Bienvenido a nuestra biblioteca, {usuario.nombre}!</h1>

      <div className="flex justify-center space-x-4">
        <button onClick={() => { navigate('/misLibros') }} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-7 uppercase">
          Ver mis libros
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {libros.map(libro => (
          <Link to={`/libro/${libro.id}`} key={libro.id} className="text-black text-lg">
            <div className="border border-gray-300 p-4 rounded-md text-center">
              <img src={libro.imagen} alt={libro.titulo} className="mx-auto mb-2 rounded-md h-60 sm:h-72 md:h-80" />
              <h3 className="text-lg font-semibold">{libro.titulo}</h3>
              <p className="text-sm text-gray-600">{libro.autor}</p>
              <p className="text-sm text-gray-600">{libro.anio}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PaginaPrincipal;
