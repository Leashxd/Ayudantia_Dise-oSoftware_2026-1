const API_BASE_URL = "http://localhost:8000";

export async function getStudents() {
  const response = await fetch(`${API_BASE_URL}/api/students`);
  return await response.json();
}
