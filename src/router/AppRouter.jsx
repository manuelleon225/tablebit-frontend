// ─────────────────────────────────────────────────────────────
// AppRouter.jsx
// Configuración central de rutas de la aplicación.
// Usa React Router DOM v7 para mapear URLs a páginas.
// Actualmente solo existe una ruta, pero aquí se agregarán
// las demás cuando se implementen (Dashboard, Reservas, etc).
// ─────────────────────────────────────────────────────────────

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mesas from "../pages/Mesas";

const AppRouter = () => {
  return (
    // BrowserRouter habilita la navegación basada en el historial
    // del navegador (URLs limpias como /mesas en lugar de /#/mesas)
    <BrowserRouter>

      // Routes evalúa cada Route y renderiza solo la que coincida
      // con la URL actual del navegador
      <Routes>

        {/* Ruta raíz → página de gestión de mesas
            TODO: agregar rutas a medida que se implementen las páginas:
            <Route path="/dashboard"  element={<Dashboard />} />
            <Route path="/reservas"   element={<Reservas />} />
            <Route path="/calendario" element={<Calendario />} />  */}
        <Route path="/" element={<Mesas />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;