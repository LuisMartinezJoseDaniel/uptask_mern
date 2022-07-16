import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { clienteAxios } from "../config/clienteAxios";

export const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }
    if (password !== repetirPassword) {
      setAlerta({ msg: "Los password no coiciden", error: true });
    }
    if (password.length < 6) {
      setAlerta({
        msg: "El password es muy corto, agrega al menos 6 caracteres",
        error: true,
      });
    }
    setAlerta({}); //Resetear la alerta

    //* Crear el usuario en la API
    //! Se necesita configurar CORS en el backend para permitir la insersion
    try {
      // Extraer la respuesta que retorna el backend, ver (usuarioController)
      const {
        data: { msg },
      } = await clienteAxios.post(`/usuarios`, {
        nombre,
        email,
        password,
      });
      setAlerta({ msg, error: false }); //Usuario creado correctamente
      // Limpiar el FORM
      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } catch (error) {
      // Extraer error con axios(Proveniente del backend)
      const {
        data: { msg },
      } = error.response;
      setAlerta({ msg, error: true });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl md:text-6xl capitalize">
        Crea tu cuenta y administra{" "}
        <span className="text-slate-700">tus proyectos</span>
      </h1>
      {alerta.msg && <Alerta alerta={alerta}></Alerta>}
      <form
        onSubmit={handleSubmit}
        action=""
        method="POST"
        className="mt-10 bg-white shadow-md rounded-lg p-10"
      >
        <div className="my-5">
          <label
            htmlFor="nombre"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Nombre
          </label>
          <input
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
            id="nombre"
            type="text"
            placeholder="Tu nombre ej. Dan"
            className="w-full p-2 mt-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="email"
            type="email"
            placeholder="Email de registro aquí"
            className="w-full p-2 mt-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            password
          </label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
            type="password"
            placeholder="Password de registro"
            className="w-full p-2 mt-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Repetir password
          </label>
          <input
            value={repetirPassword}
            onChange={(e) => {
              setRepetirPassword(e.target.value);
            }}
            id="password2"
            type="password"
            placeholder="Repetir tu password"
            className="w-full p-2 mt-3 border rounded-xl bg-gray-50"
          />
        </div>
        <input
          type="submit"
          value="Crear cuenta"
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
          to="/olvide-password"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Olvide mi password
        </Link>
      </nav>
    </>
  );
};
