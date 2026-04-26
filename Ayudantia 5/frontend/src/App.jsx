import { useEffect, useState } from "react";
import PlantCard from "./components/PlantCard.jsx";
import { getStudents } from "./api/studentsApi.js";

export default function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents().then((data) => setStudents(data));
  }, []);

  return (
    <main className="container">
      <h1>Listado de Estudiantes</h1>
      <p className="subtitle">Visualizacion general por persona</p>

      <section className="plants-grid">
        {students.map((student) => (
          <PlantCard key={student.rut} student={student} />
        ))}
      </section>
    </main>
  );
}
