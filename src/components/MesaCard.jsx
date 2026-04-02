// Tarjeta individual de mesa
const MesaCard = ({ mesa }) => {

  // Color según estado
  const getEstadoColor = () => {
    if (mesa.estado === "disponible") return "bg-gray-100 text-gray-600";
    if (mesa.estado === "ocupada") return "bg-gray-100 text-gray-600";
    if (mesa.estado === "reservada") return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="bg-white border rounded-xl p-5 flex justify-between items-start">
      
      <div>
        <h2 className="font-semibold text-lg">Mesa {mesa.numero}</h2>
        <p className="text-gray-500 text-sm">{mesa.capacidad} personas</p>

        <span className={`mt-3 inline-block px-3 py-1 text-xs rounded-full ${getEstadoColor()}`}>
          {mesa.estado}
        </span>
      </div>

      {/* Icono eliminar */}
      <button className="text-gray-400 hover:text-gray-600">
        🗑️
      </button>

    </div>
  );
};

export default MesaCard;