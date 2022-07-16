import axios from "axios"

//* Manejar un cliente axios para las peticiones HTTP en el FRONTEND
export const clienteAxios = axios.create( {
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});
