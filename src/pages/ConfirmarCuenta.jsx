import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { clienteAxios } from "../config/clienteAxios";


export const ConfirmarCuenta = () => {
  const { id } = useParams();
  const [alerta, setAlerta] = useState({ msg: "", error: false });
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;

        const { data } = await clienteAxios(url); // data contiene la respuesta del backend

        setAlerta({ msg: data.msg, error: false });

        setCuentaConfirmada(true);
      } catch (error) {
        // Acceder a la respuesta del backend con axios
        setAlerta({ msg: error.response.data.msg, error: true });
      }
    };
    return () => {
      confirmarCuenta();
    }; //Evitar el doble renderizado del StrictMode
  }, []);

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl md:text-6xl capitalize">
        Confirma tu cuenta y comienza a crear{" "}
        <span className="text-slate-700">tus proyectos</span>
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alerta.msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
            to="/"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
          >
            Inicia sesión
          </Link>
        )}
      </div>
    </>
  );
};

