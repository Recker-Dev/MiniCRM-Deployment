import axios from "axios";

export async function POST(req) {
  try {
    const payload = await req.json();

    // Call backend API
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URI}/api/campaigns`,
      payload
    );

    return Response.json(response.data);
  } catch (error) {
    console.error(
      "Error in /api/campaigns/post:",
      error.response?.data || error.message
    );

    return new Response(
      JSON.stringify({ message: "Failed to save campaign" }),
      { status: 500 }
    );
  }
}
