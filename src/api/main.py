from flask import Flask, request, jsonify

app = Flask(__name__)

# Base de datos de libros (simulada)
libros = [
    {"id": 1, "titulo": "Libro 1", "autor": "Autor 1", "año_publicacion": 2020, "estado": "disponible"},
    {"id": 2, "titulo": "Libro 2", "autor": "Autor 2", "año_publicacion": 2019, "estado": "reservado"}
]

# Ruta para obtener todos los libros
@app.route('/api/libros', methods=['GET'])
def obtener_libros():
    return jsonify({"libros": libros})


# Ruta para agregar un libro
@app.route('/api/libros', methods=['POST'])
def agregar_libro():
    nuevo_libro = request.get_json()
    libros.append(nuevo_libro)
    return jsonify({"mensaje": "Libro agregado correctamente"})

# Ruta para actualizar un libro por ID
@app.route('/api/libros/<int:libro_id>', methods=['PUT'])
def actualizar_libro(libro_id):
    libro_actualizado = request.get_json()
    for libro in libros:
        if libro['id'] == libro_id:
            libro.update(libro_actualizado)
            return jsonify({"mensaje": "Libro actualizado correctamente"})
    return jsonify({"error": "Libro no encontrado"}), 404

# Ruta para eliminar un libro por ID
@app.route('/api/libros/<int:libro_id>', methods=['DELETE'])
def eliminar_libro(libro_id):
    for libro in libros:
        if libro['id'] == libro_id:
            libros.remove(libro)
            return jsonify({"mensaje": "Libro eliminado correctamente"})
    return jsonify({"error": "Libro no encontrado"}), 404

if __name__ == '__main__':
    app.run(debug=True)
