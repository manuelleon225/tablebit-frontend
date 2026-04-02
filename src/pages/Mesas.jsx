import Layout from "../components/Layout";
import MesaCard from "../components/MesaCard";

// Datos quemados SOLO para diseño (luego conectas backend)
const mesas = [
  { id: 1, numero: 1, capacidad: 2, estado: "disponible" },
  { id: 2, numero: 2, capacidad: 4, estado: "ocupada" },
  { id: 3, numero: 3, capacidad: 6, estado: "reservada" },
  { id: 4, numero: 4, capacidad: 4, estado: "disponible" },
  { id: 5, numero: 5, capacidad: 8, estado: "disponible" },
];

// Página principal
const Mesas = () => {
  return (
    <Layout>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Mesas</h1>
          <p className="text-sm text-gray-500">5 mesas registradas</p>
        </div>

        <button className="bg-green-700 text-white px-4 py-2 rounded-lg">
          + Agregar mesa
        </button>
      </div>

      {/* Grid de mesas */}
      <div className="grid grid-cols-3 gap-6">
        {mesas.map((mesa) => (
          <MesaCard key={mesa.id} mesa={mesa} />
        ))}
      </div>

    </Layout>
  );
};

export default Mesas;