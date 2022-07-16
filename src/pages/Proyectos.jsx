import {useProyectos} from "../hooks"
export const Proyectos = () => {

  const { proyectos } = useProyectos();
  return (
    <>
      <h1 className='text-2xl font-black'>Proyectos</h1>
      <div className=''>

      </div>
    </>
  )
}
