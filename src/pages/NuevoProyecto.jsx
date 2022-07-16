import { FormularioProyecto } from "../components/FormularioProyecto";

export const NuevoProyecto = () => {

 return (
   <>
     <h1 className="text-2xl font-black">Crear Proyecto</h1>
     <div className="mt-10 flex justify-center">
       <FormularioProyecto />
     </div>
   </>
 );
}
