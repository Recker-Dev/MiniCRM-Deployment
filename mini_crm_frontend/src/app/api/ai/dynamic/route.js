import axios from "axios";

export async function POST(req) {
  try {
    const { query } = await req.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URI}/api/ai/dynamic`,
      { query }
    );

    return Response.json(response.data);
  } catch (error) {
    console.error("Error in /api/ai/dynamic:", error.response?.data || error.message);
    return new Response(JSON.stringify({ message: "AI rule generation failed" }), { status: 500 });
  }
}
