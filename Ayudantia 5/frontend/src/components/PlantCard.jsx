export default function PlantCard({ student }) {
  return (
    <article className="plant-card">
      <div className="plant-top">
        <span className="plant-menu">...</span>
      </div>

      <div className="plant-middle">
        <div className="name-row">
          <div className="name-left">
            <img className="user-icon" src="/user-icon.svg" alt="Usuario" />
            <h2>{student.nombre}</h2>
          </div>
          <span className="plant-code">{student.rut}</span>
        </div>
        <p>{student.tipo}</p>
      </div>

      <div className="pill-row">
        <span className="pill pill-anomalias">Cantidad de ramos {student.cantidadRamos}</span>
        <span className="pill pill-sensores">Años universidad {student.aniosUniversidad}</span>
      </div>
    </article>
  );
}
