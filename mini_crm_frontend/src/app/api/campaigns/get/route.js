import axios from "axios";

export async function POST(req) {
  try {
    const { userId } = await req.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URI}/api/campaigns/get`,
      { userId }
    );

    return Response.json(response.data);
  } catch (error) {
    console.error("Error in /api/campaigns/get:", error.response?.data || error.message);
    return new Response(JSON.stringify({ message: "Failed to fetch campaigns" }), { status: 500 });
  }
}
