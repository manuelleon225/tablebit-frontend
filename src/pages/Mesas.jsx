// ─────────────────────────────────────────────────────────────
// Mesas.jsx
// Página principal de la aplicación.
// Orquesta todos los componentes: lista de mesas, modal con
// formulario, y notificaciones. Es el único lugar donde se
// conectan el contexto global con la interfaz visual.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { useMesas } from "../context/MesaContext";
import Layout from "../components/Layout";
import MesaCard from "../components/MesaCard";
import Modal from "../components/Modal";
import FormMesa from "../components/FormMesa";
import Toast from "../components/Toast";

const Mesas = () => {

  // Extrae del contexto global lo necesario para esta página
  const { mesas, mensaje, tipoMensaje, setMensaje } = useMesas();

  // Controla si el modal está abierto o cerrado
  const [openModal, setOpenModal] = useState(false);

  // Guarda la mesa que el usuario quiere editar.
  // null = modo creación, objeto mesa = modo edición
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

  // ── Auto-cierre del Toast ────────────────────────────────────
  // Cada vez que llega un mensaje nuevo, inicia un temporizador
  // de 3 segundos. Al cumplirse, limpia el mensaje y el Toast desaparece.
  // El return cancela el temporizador si el mensaje cambia antes
  // de que se cumplan los 3 segundos (limpieza del efecto).
  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        setMensaje("");
      }, 3000);

      return () => clearTimeout(timer); // evita memory leaks
    }
  }, [mensaje]);

  // ── Abrir modal en modo edición ──────────────────────────────
  // MesaCard llama a esta función pasando la mesa seleccionada.
  // Se guarda la mesa en el estado y se abre el modal.
  // FormMesa detecta que mesaSeleccionada no es null y entra
  // en modo edición automáticamente.
  const handleEditar = (mesa) => {
    setMesaSeleccionada(mesa);
    setOpenModal(true);
  };

  // ── Cerrar modal y limpiar selección ────────────────────────
  // Se usa en dos lugares: el botón "Cancelar" del Modal
  // y el callback onClose de FormMesa al guardar.
  // Siempre se limpia mesaSeleccionada para que la próxima
  // apertura del modal empiece en modo creación.
  const handleCerrarModal = () => {
    setOpenModal(false);
    setMesaSeleccionada(null);
  };

  return (
    <Layout>

      {/* ── Header ────────────────────────────────────────────
          Muestra el título de la sección y el total de mesas
          registradas. El contador se actualiza automáticamente
          cada vez que el contexto refresca la lista.          */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Mesas</h1>
          <p className="text-sm text-gray-500">
            {mesas.length} mesas registradas
          </p>
        </div>

        {/* Abre el modal en modo creación (mesaSeleccionada sigue en null) */}
        <button
          onClick={() => setOpenModal(true)}
          className="bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          + Agregar mesa
        </button>
      </div>

      {/* ── Grid de mesas ─────────────────────────────────────
          Renderiza una MesaCard por cada mesa del contexto.
          key={mesa.id} permite a React identificar cada tarjeta
          y solo re-renderizar las que cambian.
          onEditar conecta el botón ✏️ de la tarjeta con
          handleEditar para abrir el modal en modo edición.     */}
      <div className="grid grid-cols-3 gap-6">
        {mesas.map((mesa) => (
          <MesaCard key={mesa.id} mesa={mesa} onEditar={handleEditar} />
        ))}
      </div>

      {/* ── Modal con formulario ──────────────────────────────
          isOpen controla la visibilidad del modal.
          FormMesa recibe mesaSeleccionada:
            - null  → modo creación (título "Agregar Mesa")
            - objeto → modo edición (título "Editar Mesa" + datos precargados) */}
      <Modal isOpen={openModal} onClose={handleCerrarModal}>
        <FormMesa
          onClose={handleCerrarModal}
          mesaSeleccionada={mesaSeleccionada}
        />
      </Modal>

      {/* ── Toast de notificaciones ───────────────────────────
          Se muestra cuando mensaje no está vacío.
          type determina el color: "success" = verde, "error" = rojo.
          onClose permite cerrarlo manualmente antes de los 3 segundos. */}
      <Toast
        message={mensaje}
        type={tipoMensaje}
        onClose={() => setMensaje("")}
      />

    </Layout>
  );
};

export default Mesas;