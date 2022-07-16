import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clienteAxios } from "../config/clienteAxios";

export const ProyectosContext = createContext();

export const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState( {} );
  const navigate = useNavigate();

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
      
    }, 3000);
  };
  //* Guardar todos los campos es necesario el Bearer Token
  const submitProyecto = async ( proyecto ) => {
    
    try {
      // Obtener el token del usuario de localStorage
      const token = localStorage.getItem( "token" );
      if ( !token ) return;
      //* Bearer Token de Authorizacion del backend
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      //* Enviar datos al backend, con la config, para que el middleware de checkauth cree el usuario
      const { data } = await clienteAxios.post( "/proyectos", proyecto, config );
      
      setAlerta( { msg: "Proyecto creado correctamente", error: false } );
      //Redirigir
      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos"); //*Redirigir a proyectos
      }, 3000);
    } catch ( error ) {
      const { msg } = error.response.data;
      setAlerta({ msg, error: true });
    }
  
  };

  return (
    <ProyectosContext.Provider
      value={{ proyectos, alerta, mostrarAlerta, submitProyecto }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};
