import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const MesaContext = createContext();

export const MesaProvider = ({ children }) => {
  const [mesas, setMesas] = useState([]);

  // Obtener mesas desde el backend
  const obtenerMesas = async () => {
    try {
      const res = await api.get("/mesas");
      setMesas(res.data);
    } catch (error) {
      console.error("Error al obtener mesas", error);
    }
  };

  useEffect(() => {
    obtenerMesas();
  }, []);

  return (
    <MesaContext.Provider value={{ mesas, obtenerMesas }}>
      {children}
    </MesaContext.Provider>
  );
};

export const useMesas = () => useContext(MesaContext);