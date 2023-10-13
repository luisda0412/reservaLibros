const url = "http://localhost:5000/libros";

export const nuevoLibro = async libro => {
    try {
        await fetch(url, {
            method: 'POST', 
            body: JSON.stringify(libro), // data puede ser string o un objeto
            headers:{
              'Content-Type': 'application/json' // Y le decimos que los datos se enviaran como JSON
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const obtenerLibros = async () => {
    try {
        const resultado = await fetch(url);
        const libros = await resultado.json();
        return libros;
    } catch (error) {
        console.log(error);
    }
}

export const obtenerLibro = async id => {
    try {
        const resultado = await fetch(`${url}/${id}`);
        const libro = await resultado.json();
        return libro;
    } catch (error) {
        console.log(error);
    }
}


export const editarLibro = async libro => {
    try {
        await fetch(`${url}/${libro.id}`, {
            method: 'PUT', 
            body: JSON.stringify(libro), // data puede ser string o un objeto
            headers:{
              'Content-Type': 'application/json' // Y le decimos que los datos se enviaran como JSON
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const eliminarLibro = async id => {
    try {
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.log(error);
    }
}