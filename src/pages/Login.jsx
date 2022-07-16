import { useState } from "react";
import { useAuth, useForm } from "../hooks";
import { Link, useNavigate } from "react-router-dom";
import { clienteAxios } from "../config/clienteAxios";
import Alerta from "../components/Alerta";

export const Login = () => {

  const { email, password, handleChange } = useForm({email:"", password: ""});
  
  const [alerta, setAlerta] = useState( { msg: "", error: false } );

  const { setAuth } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email.trim(), password.trim()].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }
    try {
      //* Obtener el JWT del backend
      const { data } = await clienteAxios.post(`/usuarios/login`, {
        email,
        password,
      } );
      
      //* Setear JWT en LocalStorage
      localStorage.setItem("token", data.token);
      setAlerta({ msg: "", error: false });
      setAuth( { data } );//* Data del usuario: nombre, _id, email
    
    } catch ( error ) {
      const { msg } = error.response.data;
      setAlerta({ msg, error: true });
    }
  };
  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl md:text-6xl capitalize">
        Inicia sesión y administra{" "}
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
            name="email"
            value={email}
            onChange={handleChange}
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
            name="password"
            value={password}
            onChange={handleChange}
            id="password"
            type="password"
            placeholder="Password de registro"
            className="w-full p-2 mt-3 border rounded-xl bg-gray-50"
          />
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="py-3 bg-sky-700 mb-5 w-full uppercase font-bold text-white rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/registrar"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿No tienes una cuenta? Registrate
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
