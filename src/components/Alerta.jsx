import PropTypes from "prop-types"

const Alerta = ( { alerta } ) => {

  const { msg, error } = alerta;
  return (
    <div
      className={`${
        error ? "from-red-400 to-red-600" : "from-sky-400 to-sky-600"
      } bg-gradient-to-br p-3 text-white text-sm mb-10 uppercase font-bold text-center`}
    >
      {msg}
    </div>
  );
};

Alerta.propTypes = {
  alerta: PropTypes.object.isRequired
}


export default Alerta;
