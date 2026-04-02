// ─────────────────────────────────────────────────────────────
// FormMesa.jsx
// Formulario reutilizable para crear o editar una mesa.
// El mismo componente sirve para los dos casos: detecta el modo
// según si recibe mesaSeleccionada (objeto) o no (null).
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { useMesas } from "../context/MesaContext";

// Props:
//   onClose          → función para cerrar el modal al terminar
//   mesaSeleccionada → objeto mesa si es edición, null si es creación
const FormMesa = ({ onClose, mesaSeleccionada }) => {

  // Solo se necesitan las funciones de escritura, no el estado de mesas
  const { crearMesa, actualizarMesa } = useMesas();

  // ── Estado del formulario ────────────────────────────────────
  // Valores iniciales para el modo creación.
  // "disponible" es el estado por defecto de una mesa nueva.
  const [form, setForm] = useState({
    numero: "",
    capacidad: "",
    estado: "disponible",
  });

  // ── Precarga de datos en modo edición ────────────────────────
  // Cuando el usuario hace clic en ✏️, Mesas.jsx pasa la mesa
  // seleccionada. Este efecto detecta ese cambio y rellena
  // el formulario con los datos actuales de esa mesa.
  // Si mesaSeleccionada es null (modo creación), no hace nada.
  useEffect(() => {
    if (mesaSeleccionada) {
      setForm({
        numero: mesaSeleccionada.numero,
        capacidad: mesaSeleccionada.capacidad,
        estado: mesaSeleccionada.estado,
      });
    }
  }, [mesaSeleccionada]); // se ejecuta cada vez que cambia la mesa seleccionada

  // ── Manejo de cambios en los inputs ─────────────────────────
  // Un solo handler para todos los campos del formulario.
  // [e.target.name] usa el atributo name del input como clave
  // dinámica, evitando un handler separado por cada campo.
  // El spread ...form conserva los valores de los otros campos.
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ── Envío del formulario ─────────────────────────────────────
  // e.preventDefault() evita que la página se recargue (comportamiento
  // por defecto de los formularios HTML).
  // parseInt convierte los campos numéricos de string a número
  // porque los inputs siempre devuelven texto aunque sean type="number".
  // restaurante_id está fijo en 1 por ahora (pendiente de implementar
  // autenticación para obtenerlo dinámicamente).
  const handleSubmit = (e) => {
    e.preventDefault();

    const datos = {
      numero: parseInt(form.numero),       // string → entero
      capacidad: parseInt(form.capacidad), // string → entero
      estado: form.estado,
      restaurante_id: 1 // TODO: obtener del contexto de autenticación
    };

    // Modo edición: actualiza la mesa existente con su id
    // Modo creación: crea una nueva mesa con los datos del form
    if (mesaSeleccionada) {
      actualizarMesa(mesaSeleccionada.id, datos);
    } else {
      crearMesa(datos);
    }

    onClose(); // cierra el modal tras guardar
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* Título dinámico según el modo del formulario */}
      <h2 className="text-xl font-semibold mb-4">
        {mesaSeleccionada ? "Editar Mesa" : "Agregar Mesa"}
      </h2>

      {/* Número de mesa — required impide enviar el form vacío */}
      <input
        type="number"
        name="numero"
        value={form.numero}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded-lg"
        placeholder="Número"
        required
      />

      {/* Capacidad de personas que admite la mesa */}
      <input
        type="number"
        name="capacidad"
        value={form.capacidad}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded-lg"
        placeholder="Capacidad"
        required
      />

      {/* Estado de la mesa — 3 opciones posibles:
          disponible → libre para asignar
          ocupada    → en uso en este momento
          inactiva   → fuera de servicio                         */}
      <select
        name="estado"
        value={form.estado}
        onChange={handleChange}
        className="w-full border p-2 mb-4 rounded-lg"
      >
        <option value="disponible">Disponible</option>
        <option value="ocupada">Ocupada</option>
        <option value="inactiva">Inactiva</option>
      </select>

      {/* Botón de envío — dispara handleSubmit vía onSubmit del form */}
      <button className="w-full bg-green-700 text-white py-2 rounded-lg">
        Guardar
      </button>

    </form>
  );
};

export default FormMesa;