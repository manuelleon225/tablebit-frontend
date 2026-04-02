// ─────────────────────────────────────────────────────────────
// MesaCard.jsx
// Tarjeta visual que representa una mesa individual.
// Muestra su información y expone dos acciones: editar y eliminar.
// La eliminación incluye un diálogo de confirmación antes de
// ejecutarse para evitar borrados accidentales.
// ─────────────────────────────────────────────────────────────

import Swal from "sweetalert2";
import { useMesas } from "../context/MesaContext";

// Props:
//   mesa     → objeto con los datos de la mesa { id, numero, capacidad, estado }
//   onEditar → función de Mesas.jsx que guarda la mesa seleccionada
//              y abre el modal con FormMesa en modo edición
const MesaCard = ({ mesa, onEditar }) => {

  // Solo necesita eliminarMesa del contexto
  // La edición la maneja el padre (Mesas.jsx) via onEditar
  const { eliminarMesa } = useMesas();

  // ── Confirmación antes de eliminar ──────────────────────────
  // Muestra un diálogo de advertencia con SweetAlert2.
  // Solo llama a eliminarMesa si el usuario confirma con "Sí, eliminar".
  // Si cancela o cierra el diálogo, no ocurre nada.
  const confirmarEliminar = () => {
    Swal.fire({
      title: "¿Eliminar mesa?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626", // rojo — refuerza que es una acción destructiva
      cancelButtonColor: "#6b7280",  // gris neutro para cancelar
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      // result.isConfirmed es true solo si el usuario hizo clic en "Sí, eliminar"
      if (result.isConfirmed) {
        eliminarMesa(mesa.id);
      }
    });
  };

  return (
    <div className="bg-white border rounded-xl p-5 flex justify-between">

      {/* ── Información de la mesa ────────────────────────────
          Muestra número, capacidad y estado actual.
          El estado se presenta como una etiqueta (badge) redondeada
          para distinguirlo visualmente del resto del texto.        */}
      <div>
        <h2 className="font-semibold text-lg">Mesa {mesa.numero}</h2>
        <p className="text-gray-500 text-sm">{mesa.capacidad} personas</p>

        {/* Badge de estado: disponible | ocupada | inactiva
            TODO: considerar colores distintos por estado
            (verde=disponible, rojo=ocupada, gris=inactiva)         */}
        <span className="mt-3 inline-block px-3 py-1 text-xs rounded-full bg-gray-100">
          {mesa.estado}
        </span>
      </div>

      {/* ── Acciones ──────────────────────────────────────────
          ✏️ Editar: pasa la mesa completa a onEditar (Mesas.jsx),
             que la guarda en mesaSeleccionada y abre el modal.
          🗑️ Eliminar: abre el diálogo de confirmación antes
             de llamar a eliminarMesa en el contexto.              */}
      <div className="flex gap-2">
        <button onClick={() => onEditar(mesa)}>✏️</button>
        <button onClick={confirmarEliminar}>🗑️</button>
      </div>

    </div>
  );
};

export default MesaCard;