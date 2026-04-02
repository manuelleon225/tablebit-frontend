// ─────────────────────────────────────────────────────────────
// App.jsx
// Componente raíz de la aplicación.
// Su única responsabilidad es ensamblar los dos pilares globales:
//   1. MesaProvider → inyecta el estado y funciones CRUD
//   2. AppRouter    → controla qué página se muestra según la URL
// Todo lo demás vive dentro de estos dos.
// ─────────────────────────────────────────────────────────────

import AppRouter from "./router/AppRouter";
import { MesaProvider } from "./context/MesaContext";
import 'sweetalert2/dist/sweetalert2.min.css'; // estilos globales de alertas

function App() {
  return (
    // MesaProvider debe envolver a AppRouter para que todas las
    // páginas y componentes hijos tengan acceso al contexto global.
    // Si AppRouter estuviera fuera de MesaProvider, useMesas()
    // fallaría en cualquier componente que lo llamara.
    <MesaProvider>
      <AppRouter />
    </MesaProvider>
  );
}

export default App;