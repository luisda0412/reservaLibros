import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UsuarioProvider } from './hooks/UsuarioContext'; // Importa UsuarioProvider
import CrearUsuario from './components/CrearUsuario';
import MantenimientoLibro from './components/MantenimientoLibro';
import Login from './components/Login';
import PaginaPrincipal from './components/PaginaPrincipal';
import DetallesLibro from './components/DetallesLibro';
import DetallesLibroMantenimiento from './components/DetallesLibroMantenimiento';
import NuevoLibro from './components/NuevoLibro';
import EditarLibro from './components/EditarLibro';
import LibrosUsuario from './components/LibrosUsuario';

function App() {
  return (
    <BrowserRouter>
      <UsuarioProvider> {/* Envuelve tu aplicación con UsuarioProvider */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/crearUsuario" element={<CrearUsuario />} />
          <Route path="/paginaPrincipal" element={<PaginaPrincipal />} />
          <Route path="/mantenimientoLibro" element={<MantenimientoLibro />} />
          <Route path="/nuevoLibro" element={<NuevoLibro />} />
          <Route path="/misLibros" element={<LibrosUsuario />} />
          <Route path="/libro/:id" element={<DetallesLibro />} />
          <Route path="/libroEditar/:id" element={<EditarLibro />} />
          <Route path="/libroMantenimiento/:id" element={<DetallesLibroMantenimiento />} />
          <Route render={() => <h1>Not found!</h1>} />
        </Routes>
      </UsuarioProvider>
    </BrowserRouter>
  );
}

export default App;
