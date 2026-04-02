// ─────────────────────────────────────────────────────────────
// MesaContext.jsx
// Contexto global para la gestión de mesas.
// Centraliza el estado y todas las operaciones CRUD contra la API,
// evitando pasar props manualmente entre componentes (prop drilling).
// ─────────────────────────────────────────────────────────────

import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";

// Crea el contexto vacío. Su valor real lo define MesaProvider más abajo.
const MesaContext = createContext();

// ─── PROVIDER ────────────────────────────────────────────────
// Envuelve la app (en App.jsx) y pone el estado + funciones
// disponibles para cualquier componente hijo que use useMesas().
export const MesaProvider = ({ children }) => {

  // Lista de mesas traídas del backend
  const [mesas, setMesas] = useState([]);

  // Mensaje y tipo para el componente Toast (actualmente no se usan
  // en las operaciones CRUD porque se reemplazaron por SweetAlert2,
  // pero se mantienen por si se necesitan en el futuro)
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  // ── GET /mesas ──────────────────────────────────────────────
  // Trae todas las mesas del backend y actualiza el estado local.
  // Se llama automáticamente al montar el provider (ver useEffect)
  // y después de cada operación CRUD para mantener la lista al día.
  const obtenerMesas = async () => {
    try {
      const res = await api.get("/mesas");
      setMesas(res.data);
    } catch (error) {
      console.error("Error al obtener mesas", error);
    }
  };

  // ── POST /mesas ─────────────────────────────────────────────
  // Recibe el objeto mesa desde FormMesa.jsx y lo envía al backend.
  // Si tiene éxito, muestra alerta verde y refresca la lista.
  // Si falla, muestra alerta roja con el mensaje de error.
  const crearMesa = async (mesa) => {
    try {
      await api.post("/mesas", mesa);
      Swal.fire({
        icon: "success",
        title: "Mesa creada",
        text: "La mesa se creó correctamente",
        confirmButtonColor: "#15803d",
        buttonsStyling: true,
      });
      obtenerMesas(); // refresca la lista para mostrar la nueva mesa
    } catch (error) {
      console.error(error.response.data);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear la mesa",
        buttonsStyling: true,
      });
    }
  };

  // ── DELETE /mesas/:id ────────────────────────────────────────
  // Elimina la mesa con el id dado.
  // El diálogo de confirmación (¿Estás seguro?) lo maneja MesaCard,
  // este método solo ejecuta el borrado una vez confirmado.
  const eliminarMesa = async (id) => {
    try {
      await api.delete(`/mesas/${id}`);
      Swal.fire({
        icon: "success",
        title: "Mesa eliminada",
        text: "La mesa fue eliminada correctamente",
        buttonsStyling: true,
      });
      obtenerMesas(); // refresca la lista sin la mesa eliminada
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar la mesa",
        buttonsStyling: true,
      });
    }
  };

  // ── PUT /mesas/:id ───────────────────────────────────────────
  // Actualiza los datos de una mesa existente.
  // Recibe el id de la mesa y el objeto con los campos modificados.
  const actualizarMesa = async (id, datos) => {
    try {
      await api.put(`/mesas/${id}`, datos);
      Swal.fire({
        icon: "success",
        title: "Mesa actualizada",
        text: "Los cambios se guardaron correctamente",
      });
      obtenerMesas(); // refresca la lista con los datos actualizados
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar la mesa",
      });
    }
  };

  // Carga las mesas la primera vez que la app abre.
  // El array vacío [] asegura que solo se ejecute una vez (al montar).
  useEffect(() => {
    obtenerMesas();
  }, []);

  return (
    // Expone hacia abajo todo lo que los componentes hijos pueden usar:
    // - mesas: la lista actual
    // - crearMesa, eliminarMesa, actualizarMesa: operaciones CRUD
    // - mensaje, tipoMensaje, setMensaje: control del Toast
    <MesaContext.Provider
      value={{ mesas, crearMesa, eliminarMesa, mensaje, tipoMensaje, setMensaje, actualizarMesa }}
    >
      {children}
    </MesaContext.Provider>
  );
};

// ─── HOOK PERSONALIZADO ───────────────────────────────────────
// Simplifica el consumo del contexto en cualquier componente.
// En lugar de escribir: const { mesas } = useContext(MesaContext)
// solo se escribe:      const { mesas } = useMesas()
export const useMesas = () => useContext(MesaContext);