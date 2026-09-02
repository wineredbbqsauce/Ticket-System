import { Route, Routes } from "react-router";
import CustomerPage from "./pages/CustomerPage";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeePanel from "./pages/EmployeePanel";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerPage />} />
      <Route path="/ansatt" element={<EmployeeLogin />} />
      <Route path="/ansatt/panel" element={<EmployeePanel />} />
    </Routes>
  );
}
