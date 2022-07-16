import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { clienteAxios } from "../config/clienteAxios";
import Alerta from "../components/Alerta";

export const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({ msg: "", error: false });
  const [passwordModificado, setPasswordModificado] = useState(false);

  const { token } = useParams();
  //* Verificar el token antes de mostrar el formulario
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios( `/usuarios/olvide-password/${token}` );
        //* Si el token es valido en el backend se establece el tokenValido como true
        setTokenValido(true);
      } catch (error) {
        const { data } = error.response;
        setAlerta({ msg: data.msg, error: true });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim() || password.length < 6) {
      setAlerta({
        msg: "Por favor, ingresa un password mayor a 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;

      const { data } = await clienteAxios.post(url, {
        password,
        token,
      });

      setAlerta({ msg: data.msg, error: false });
      setPasswordModificado(true);//*Mostrar el link hacia iniciar sesion
    } catch (error) {
      const { data } = error.response;
      setAlerta({ msg: data.msg, error: true });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl md:text-6xl capitalize">
        Reestablece tu password y no pierdas el acceso a{" "}
        <span className="text-slate-700">tus proyectos</span>
      </h1>
      {alerta.msg && <Alerta alerta={alerta} />}
      {tokenValido && (
        <form
          onSubmit={handleSubmit}
          className="mt-10 bg-white shadow-md rounded-lg p-10"
        >
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Nuevo Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Escribe tu nuevo password"
              className="w-full p-2 mt-3 border rounded-xl bg-gray-50"
            />
          </div>

          <input
            type="submit"
            value="Guardar nuevo password"
            className="py-3 bg-sky-700 mb-5 w-full uppercase font-bold text-white rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}
      {passwordModificado && (
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Inicia sesión
        </Link>
      )}
    </>
  );
};

