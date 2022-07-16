import { useEffect, useState, createContext } from "react";
import { clienteAxios } from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState( {} );
  const [cargando, setCargando] = useState( true );
  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      //*token del backend con JWT
      const token = localStorage.getItem("token");
      if ( !token ) {
        setCargando( false );
        return;
      };

      //* Configuracion para leer el bearer token de checkAuth()
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clienteAxios("/usuarios/perfil", config);
        setAuth( data );//* Establecer la sesion del backend
        navigate("/proyectos"); //* Redirecionar a proyectos si no ha expirado el token
      } catch ( error ) {
        setAuth( {} );
      } finally {
        setCargando( false );
      }
      
    };
    autenticarUsuario();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
