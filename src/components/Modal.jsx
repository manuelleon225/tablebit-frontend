// ─────────────────────────────────────────────────────────────
// Modal.jsx
// Componente modal genérico y reutilizable.
// No sabe qué contenido muestra — eso lo decide quien lo usa.
// Actualmente lo usa Mesas.jsx para mostrar FormMesa, pero puede
// reutilizarse para cualquier otro contenido en el futuro.
// ─────────────────────────────────────────────────────────────

// Props:
//   isOpen   → boolean que controla si el modal se muestra o no
//   onClose  → función para cerrar el modal (viene de Mesas.jsx)
//   children → contenido a mostrar dentro del modal (FormMesa)
const Modal = ({ isOpen, onClose, children }) => {

  // Si isOpen es false, no renderiza nada en el DOM.
  // Esto es más eficiente que ocultarlo con CSS porque
  // desmonta completamente el contenido (incluyendo FormMesa),
  // lo que resetea su estado interno al volver a abrirlo.
  if (!isOpen) return null;

  return (
    // ── Capa de fondo (overlay) ────────────────────────────────
    // Cubre toda la pantalla con un fondo semitransparente oscuro.
    // fixed + inset-0 lo posiciona sobre todo el contenido.
    // z-50 asegura que quede por encima de cualquier otro elemento.
    // flex centra el cuadro del modal horizontal y verticalmente.
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      {/* ── Cuadro del modal ────────────────────────────────────
          Contenedor blanco centrado con ancho máximo de 448px.
          max-w-md evita que se estire demasiado en pantallas grandes.
          w-full asegura que se adapte en pantallas pequeñas.        */}
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">

        {/* Contenido dinámico — en este caso FormMesa.
            Al usar children, Modal no depende de ningún componente
            específico y puede reutilizarse con cualquier contenido. */}
        {children}

        {/* ── Botón Cancelar ──────────────────────────────────────
            Siempre visible al pie del modal, independiente del
            contenido. Llama a onClose que en Mesas.jsx limpia
            mesaSeleccionada y cierra el modal.                      */}
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="w-full bg-gray-700 text-white py-2 rounded-lg"
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
};

export default Modal;