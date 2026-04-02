// ─────────────────────────────────────────────────────────────
// main.jsx
// Punto de entrada de la aplicación.
// Es el primer archivo que ejecuta Vite al iniciar.
// Su única tarea es montar el componente raíz <App /> en el DOM
// y aplicar los estilos globales.
// ─────────────────────────────────────────────────────────────

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'                           // estilos globales de Tailwind
import 'sweetalert2/dist/sweetalert2.min.css' // estilos globales de alertas

// ReactDOM.createRoot inicializa React en modo concurrente (React 18+),
// que mejora el rendimiento permitiendo renderizados interrumpibles.
// getElementById('root') apunta al <div id="root"> en index.html,
// que es el único elemento HTML real — React construye todo lo demás.
ReactDOM.createRoot(document.getElementById('root')).render(

  // StrictMode es una herramienta solo de desarrollo (no afecta producción).
  // Activa advertencias adicionales para detectar problemas comunes como:
  //   - efectos con dependencias incorrectas
  //   - uso de APIs obsoletas de React
  //   - renders dobles intencionales para detectar efectos secundarios
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)