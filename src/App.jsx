import { BrowserRouter, Routes, Route } from "react-router-dom";

import ListUsers from "./pages/listUsers";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ListEventos from "./pages/listEventos";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateEvent from "./pages/CreateEvent";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/cadastro"
            element={
              <ProtectedRoute>
                <Cadastro />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <ListUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/eventos"
            element={
              <ProtectedRoute>
                <ListEventos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/CreateEvent" element={<CreateEvent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
