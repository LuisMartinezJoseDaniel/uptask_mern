import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ProyectosProvider } from "./context/ProyectosProvider";
import { AuthLayout, RutaProtegida } from "./layouts";
import {
  ConfirmarCuenta,
  Login,
  NuevoPassword,
  OlvidePassword,
  Proyectos,
  Registrar,
} from "./pages";
import { NuevoProyecto } from "./pages/NuevoProyecto";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Routes-> no acepta otro hijo que no sea Route */}
        <ProyectosProvider>
          <Routes>
            {/* Agrupador para esta ruta con un Layout */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />{" "}
              {/*Elemento Que se muestra al cargar la ruta*/}
              <Route path="registrar" element={<Registrar />} />{" "}
              {/* /registrar */}
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
              <Route path="olvide-password" element={<OlvidePassword />} />{" "}
              {/* Email del usuario */}
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword />}
              />
            </Route>
            {/** Area privada, despues de login */}
            <Route path="/proyectos" element={<RutaProtegida />}>
              <Route index element={<Proyectos />} />
              <Route path="crear-proyecto" element={<NuevoProyecto />} />
            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
