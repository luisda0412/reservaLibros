import React from 'react';
import { useUsuario } from '../hooks/UsuarioContext';
import { Link } from 'react-router-dom';
import { cancelarReservaLibro } from '../api/apiUsuario';
import { obtenerLibro, editarLibro } from '../api/apiJSON';

const MisLibros = () => {
  const { usuario, setUsuario } = useUsuario();

  const handleCancelarReserva = async (libroId) => {
    try {
      await cancelarReservaLibro(usuario.id, libroId);
      const libro = await obtenerLibro(libroId);
      await editarLibro({ ...libro, estado: 1 });
      const nuevoUsuario = {
        ...usuario,
        libros: usuario.libros.filter(libro => libro.id !== libroId),
      };
      setUsuario(nuevoUsuario);
    } catch (error) {
      console.error('Error al cancelar la reserva del libro:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-5 text-center">Mis Libros Reservados</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {usuario && usuario.libros && usuario.libros.length > 0 ? (
          usuario.libros.map((libro, index) => (
            <div className="border border-gray-300 p-4 rounded-md" key={libro.id}>
              <img src={libro.imagen} alt={libro.titulo} className="mx-auto mb-2 rounded-md h-60 sm:h-80 lg:h-96" />
              <h3 className="text-lg font-semibold">{libro.titulo}</h3>
              <p className="text-sm text-gray-600">{libro.autor}</p>
              <p className="text-sm text-gray-600">{libro.anio}</p>
              <button
                className="bg-red-600 p-2 text-white uppercase font-bold hover:bg-red-700 cursor-pointer rounded mt-4"
                onClick={() => handleCancelarReserva(libro.id)}
              >
                Cancelar Reserva
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">No has reservado ningún libro.</p>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <Link to="/paginaprincipal">
          <button className="bg-indigo-600 p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer rounded transition-all">
            Volver
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MisLibros;
