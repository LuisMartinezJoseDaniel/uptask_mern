import { useNavigate } from "react-router-dom";
import { useAuth, useForm, useProyectos } from "../hooks";
import Alerta from "./Alerta";

export const FormularioProyecto = () => {
  const { alerta, mostrarAlerta, submitProyecto } = useProyectos();

  
  
  const {
    form,
    nombre,
    descripcion,
    fechaEntrega,
    cliente,
    handleChange,
    resetForm,
  } = useForm({
    nombre: "",
    descripcion: "",
    fechaEntrega: "",
    cliente: "",
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    if ( [nombre, descripcion, fechaEntrega, cliente].includes( "" ) ) {
      mostrarAlerta( {
        msg: "Todos Los campos son obligatorios",
        error:true
      } )
      return;
    }

    //Pasar los datos 
    //Esperar a que termine de hacer el submit del proyecto
    await submitProyecto( form );
    resetForm();
    
  };

  const { msg, error } = alerta;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-md"
    >
      {msg && <Alerta alerta={alerta} />}

      <div className="mb-5">
        <label
          htmlFor="nombre"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre Proyecto
        </label>
        <input
          id="nombre"
          value={nombre}
          name="nombre"
          onChange={handleChange}
          placeholder="Nombre del proyecto"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="descripcion"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Descripcion Proyecto
        </label>
        <textarea
          id="descripcion"
          value={descripcion}
          name="descripcion"
          onChange={handleChange}
          placeholder="Descripcion del proyecto"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="fecha-entrega"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Fecha Entrega
        </label>
        <input
          id="fecha-entrega"
          value={fechaEntrega}
          name="fechaEntrega"
          onChange={handleChange}
          type="date"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="cliente"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre Cliente
        </label>
        <input
          id="cliente"
          value={cliente}
          name="cliente"
          onChange={handleChange}
          placeholder="Nombre del cliente"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400"
        />
      </div>
      <input
        type="submit"
        value="Crear Proyecto"
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};
