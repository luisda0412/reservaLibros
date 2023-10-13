import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nuevoUsuario } from '../api/apiUsuario';
import bcrypt from 'bcryptjs';
import Error from './Error';

const CrearUsuario = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    clave: '',
    libros: []
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { nombre, correo, clave } = usuario;

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (!nombre || !correo || !clave) {
      setError('Todos los campos son obligatorios.');

      // Después de 2 segundos, limpiar el mensaje de error
      setTimeout(() => {
        setError('');
      }, 2000);

      return;
    }

    // Encripta la contraseña antes de enviarla al servidor
    const hashedClave = await bcrypt.hash(clave, 10); // El segundo argumento es el número de rondas de hashing

    const usuarioEncriptado = {
      ...usuario,
      clave: hashedClave, // Utiliza la contraseña encriptada
    };

    usuarioEncriptado.id = generarId();

    // Lógica para agregar un nuevo usuario (reemplaza con tu propia lógica)
    await nuevoUsuario(usuarioEncriptado);

    // Restablece los campos del formulario
    setUsuario({
      nombre: '',
      correo: '',
      clave: '',
    });

  };

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return fecha + random;
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-auto mt-5 p-4">
      <h2 className='font-black text-3xl text-center'>Crear cuenta</h2>
      
      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>

      {error && <Error>{error}</Error>}

        <div className='mb-4'>
          <label htmlFor='nombre' className='block text-gray-700 uppercase font-bold mb-2'>
            Nombre
          </label>
          <input
            id='nombre'
            name='nombre'
            type="text"
            placeholder='Nombre'
            className='border-2 w-full p-2 placeholder-gray-400 rounded-md'
            value={nombre}
            onChange={handleChange}
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='correo' className='block text-gray-700 uppercase font-bold mb-2'>
            Email
          </label>
          <input
            id='correo'
            type="email"
            name='correo'
            placeholder='Email'
            className='border-2 w-full p-2 placeholder-gray-400 rounded-md'
            value={correo}
            onChange={handleChange}
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='clave' className='block text-gray-700 uppercase font-bold mb-2'>
            Contraseña
          </label>
          <input
            id='clave'
            type="password"
            name='clave'
            className='border-2 w-full p-2 placeholder-gray-400 rounded-md'
            placeholder='Contraseña'
            value={clave}
            onChange={handleChange}
          />
        </div>

        <input
          type='submit'
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer rounded transition-all mb-4'
          value={'Crear'}
        />
      </form>
    </div>
  );
}

export default CrearUsuario;
