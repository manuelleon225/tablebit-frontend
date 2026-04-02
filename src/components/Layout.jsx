// Layout principal con barra lateral
const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
        
        <div>
          <h1 className="text-xl font-bold mb-8">TableBit</h1>

          <nav className="space-y-4">
            <p className="text-gray-600">Dashboard</p>
            <p className="font-semibold">Mesas</p>
            <p className="text-gray-600">Calendario</p>
            <p className="text-gray-600">Reservas</p>
          </nav>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">Admin</p>
          <button className="text-sm text-gray-600">← Volver</button>
        </div>

      </aside>

      {/* Contenido */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;