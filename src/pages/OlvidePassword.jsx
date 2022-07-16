import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import { validateEmail } from "../helpers/validaciones";
import { clienteAxios } from "../config/clienteAxios";
// Form para que el usuario coloque su EMAIL para enviar las instrucciones

export const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({ msg: "", error: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !validateEmail(email)) {
      setAlerta({ msg: "Por favor, ingresa un email válido", error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {
        email,
      });

      setAlerta({ msg: data.msg, error: false });
    } catch (error) {
      const { msg } = error.response.data;
      setAlerta({ msg, error: true });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl md:text-6xl capitalize">
        Recupera tu acceso y no pierdas{" "}
        <span className="text-slate-700">tus proyectos</span>
      </h1>
      {alerta.msg && <Alerta alerta={alerta} />}
      <form
        onSubmit={handleSubmit}
        className="mt-10 bg-white shadow-md rounded-lg p-10"
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de registro aquí"
            className="w-full p-2 mt-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <input
          type="submit"
          value="Enviar instrucciones"
          className="py-3 bg-sky-700 mb-5 w-full uppercase font-bold text-white rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
        <Link
          to="/registrar"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿No tienes una cuenta? Registrate
        </Link>
      </nav>
    </>
  );
};
