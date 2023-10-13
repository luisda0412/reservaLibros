import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerLibro, editarLibro } from '../api/apiJSON';
import { useUsuario } from '../hooks/UsuarioContext';
import { editarUsuario } from '../api/apiUsuario';

const DetallesLibro = () => {
  const { id } = useParams();
  const [libro, setLibro] = useState(null);
  const [reservaExitosa, setReservaExitosa] = useState(false);
  const { usuario, setUsuario } = useUsuario();
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

  const handleReservarClick = async () => {
    try {
      const libroReservado = { ...libro, estado: 0 };

      // Agregar el libro al arreglo de libros del usuario
      const nuevoUsuario = {
        ...usuario,
        libros: [...usuario.libros, libroReservado],
        clave: usuario.clave // Asegúrate de incluir el campo de clave en el objeto de usuario
      };

      // Enviar el usuario actualizado a la API
      await editarLibro({ ...libro, estado: 0 });
      await editarUsuario(nuevoUsuario);

      // Actualizar el contexto con el nuevo usuario
      setUsuario(nuevoUsuario);
      setLibro(libroReservado);
      setReservaExitosa(true);

      // Ocultar el mensaje después de 2 segundos
      setTimeout(() => {
        setReservaExitosa(false);
      }, 2000);

      console.log('Libro reservado con éxito.');
    } catch (error) {
      console.error('Error al reservar el libro:', error);
    }
  };

  if (!libro) {
    return <p className="text-center mt-8">Cargando...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      {reservaExitosa && (
        <div className="mb-4 p-2 bg-green-200 text-green-800 rounded text-center">
          Libro reservado exitosamente.
        </div>
      )}
      {libro.estado === 0 && (
        <p className="text-red-600 font-semibold mb-4 text-center">
          Este libro está reservado. No está disponible en este momento.
        </p>
      )}
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-3xl font-bold mb-5">{libro.titulo}</h2>
        <img
          src={libro.imagen}
          alt={libro.titulo}
          className="w-64 h-200 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-600 text-lg mb-2">Autor: {libro.autor}</p>
        <p className="text-gray-600 text-lg mb-2">Año: {libro.anio}</p>
        <div className="flex space-x-4">
          <button
            onClick={handleReservarClick}
            className={`bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer rounded transition-all ${
              libro.estado === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={libro.estado === 0} // Deshabilita el botón si el libro está reservado (estado: 0)
          >
            Reservar
          </button>
          <button
            onClick={() => navigate('/paginaPrincipal')}
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer rounded transition-all"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetallesLibro;
