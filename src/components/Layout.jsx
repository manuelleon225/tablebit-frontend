// ─────────────────────────────────────────────────────────────
// Layout.jsx
// Estructura visual base de la aplicación.
// Define la distribución general: sidebar fijo a la izquierda
// y área de contenido a la derecha. Todas las páginas se
// renderizan dentro de este Layout via children.
// ─────────────────────────────────────────────────────────────

// Props:
//   children → contenido de la página actual (en este caso Mesas.jsx)
const Layout = ({ children }) => {
  return (

    // Contenedor raíz: ocupa toda la altura de la pantalla
    // y organiza sidebar + contenido en fila (flex horizontal)
    <div className="flex h-screen bg-[#f5f5f5]">

      {/* ── Sidebar ───────────────────────────────────────────
          Barra lateral fija de 256px de ancho.
          justify-between separa la navegación (arriba) del
          perfil y botón volver (abajo).
          TODO: los enlaces de navegación son texto estático,
          pendiente conectarlos a rutas con <Link> de React Router. */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">

        {/* Bloque superior: logo + navegación */}
        <div>
          {/* Nombre de la aplicación como logo textual */}
          <h1 className="text-xl font-bold mb-8">TableBit</h1>

          {/* Navegación principal
              "Mesas" está resaltado (font-semibold) porque es
              la única página activa por ahora.
              Los demás items aún no tienen rutas configuradas. */}
          <nav className="space-y-4">
            <p className="text-gray-600">Dashboard</p>
            <p className="font-semibold">Mesas</p>       {/* página activa */}
            <p className="text-gray-600">Calendario</p>  {/* sin ruta aún */}
            <p className="text-gray-600">Reservas</p>    {/* sin ruta aún */}
          </nav>
        </div>

        {/* Bloque inferior: usuario y botón volver
            TODO: reemplazar "Admin" por el nombre del usuario
            autenticado cuando se implemente el login.            */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Admin</p>
          <button className="text-sm text-gray-600">← Volver</button>
        </div>

      </aside>

      {/* ── Área de contenido ─────────────────────────────────
          flex-1 hace que ocupe todo el espacio restante
          después del sidebar. Cada página se renderiza aquí
          a través de children.                                  */}
      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
};

export default Layout;