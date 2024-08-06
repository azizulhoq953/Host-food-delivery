export async function GET(req) {
  try {
    return Response.json({ message: "Hello from the API" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}
