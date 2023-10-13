import React, { useState, useEffect } from 'react';
import Error from './Error';
import { useNavigate } from 'react-router-dom';
import { validarCredenciales } from '../api/apiUsuario';
import { useUsuario } from '../hooks/UsuarioContext';

const Login = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUsuario } = useUsuario();

  useEffect(() => {
    let errorTimeout;

    // Limpiar el mensaje de error después de 2 segundos
    if (error) {
      errorTimeout = setTimeout(() => {
        setError('');
      }, 2000);
    }

    // Limpiar el temporizador al desmontar el componente
    return () => {
      clearTimeout(errorTimeout);
    };
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos vacíos
    if (!email || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      const usuario = await validarCredenciales(email, password);

      if (usuario) {
        setUsuario(usuario);
        // Resto del código para redirigir según el tipo de usuario
        if (usuario.correo === 'admin@gmail.com') {
          navigate('/mantenimientoLibro');
        } else {
          navigate('/paginaPrincipal');
        }
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error al validar credenciales');
      console.error('Error al validar credenciales:', error);
    }
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-auto mt-5">
      <h2 className='font-black text-3xl text-center'>Bienvenidos!</h2>

      <form 
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>

        {error && <Error><p>{error}</p></Error>}

        <div className='mb-5'>
          <label htmlFor='email' className='block text-gray-700 uppercase font-bold'>
            Email
          </label>

          <input
            id='email'
            type="email"
            placeholder='Email'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='password' className='block text-gray-700 uppercase font-bold'>
            Contraseña
          </label>

          <input
            id='password'
            type="password"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <input
          type='submit'
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer rounded transition-all'
          value={'Iniciar Sesión'}
        />
        <div className='text-center mt-5 cursor-pointer' onClick={() => navigate('/crearUsuario')}>
          <p>Crear cuenta</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
