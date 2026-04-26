const dataPath = new URL("./data.json", import.meta.url);

// Handler mas simple: solo devuelve el archivo JSON
async function studentsHandler(): Promise<Response> {
  return new Response(await Deno.readTextFile(dataPath), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
    },
  });
}

Deno.serve({ port: 8000 }, async (req) => {
  const url = new URL(req.url);

  if (req.method === "GET" && url.pathname === "/api/students") {
    return await studentsHandler();
  }

  return new Response("Not Found", { status: 404 });
});

console.log("API en http://localhost:8000/api/students");
