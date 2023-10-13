const url = "http://localhost:4000/usuarios";
import bcrypt from 'bcryptjs'

export const nuevoUsuario = async usuario => {
    try {
        await fetch(url, {
            method: 'POST', 
            body: JSON.stringify(usuario), // data puede ser string o un objeto
            headers:{
              'Content-Type': 'application/json' // Y le decimos que los datos se enviaran como JSON
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const obtenerUsuarios = async () => {
    try {
        const resultado = await fetch(url);
        const usuarios = await resultado.json();
        return usuarios;
    } catch (error) {
        console.log(error);
    }
}

export const obtenerUsuario = async id => {
    try {
        const resultado = await fetch(`${url}/${id}`);
        const usuario = await resultado.json();
        return usuario;
    } catch (error) {
        console.log(error);
    }
}


export const editarUsuario = async usuario => {
    try {
      await fetch(`${url}/${usuario.id}`, {
        method: 'PUT',
        body: JSON.stringify(usuario),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  

export const eliminarUsuario = async id => {
    try {
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.log(error);
    }
}

export const validarCredenciales = async (correo, password) => {
    try {
      const usuarios = await obtenerUsuarios();
      const usuario = usuarios.find((user) => user.correo === correo);
  
      if (usuario && bcrypt.compareSync(password, usuario.clave)) {
        // Desencripta la contraseña y compara con la ingresada
        /* delete usuario.clave; */ // Elimina la contraseña antes de devolver el usuario
        return usuario;
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al validar las credenciales:', error);
      throw error;
    }
  };

  export const cancelarReservaLibro = async (usuarioId, libroId) => {
    try {
        const response = await fetch(`${url}/${usuarioId}`);
        const usuario = await response.json();

        const nuevosLibros = usuario.libros.filter((libro) => libro.id !== libroId);

        // Cambia el estado del libro a 1 cuando se cancela la reserva
        const libroCancelado = usuario.libros.find((libro) => libro.id === libroId);
        libroCancelado.estado = 1;

        const nuevoUsuario = {
            ...usuario,
            libros: nuevosLibros,
        };

        await fetch(`${url}/${usuarioId}`, {
            method: 'PUT',
            body: JSON.stringify(nuevoUsuario),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(`Reserva del libro con ID ${libroId} cancelada correctamente.`);
    } catch (error) {
        console.error('Error al cancelar la reserva del libro:', error);
        throw error;
    }
};
