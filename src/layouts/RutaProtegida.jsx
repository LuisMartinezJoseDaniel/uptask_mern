import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useAuth } from "../hooks";

export const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "Cargando...";
  return (
    <>
      

      {/* No autenticado: Navigate -> redirecciona al login*/}
      {/* En caso de que este autenticado se inyecta el Outlet */}
      {auth._id ? (
        <div className="bg-gray-100">
          <Header />
          {/* Contenido Principal */}
          <div className="md:flex md:min-h-screen">
            <Sidebar />
            <main className="p-10 flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to={`/`} />
      )}
    </>
  );
};
