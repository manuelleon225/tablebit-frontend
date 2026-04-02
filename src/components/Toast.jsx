// Componente de notificación
const Toast = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`px-4 py-3 rounded-lg shadow-md text-white ${
          type === "success" ? "bg-green-600" : "bg-red-600"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <span>{message}</span>
          <button onClick={onClose}>✖</button>
        </div>
      </div>
    </div>
  );
};

export default Toast;