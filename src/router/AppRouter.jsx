import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mesas from "../pages/Mesas";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/mesas" element={<Mesas />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;