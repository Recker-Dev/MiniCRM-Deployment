import axios from "axios";

export async function POST(req) {
  try {
    const ruleGroup = await req.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URI}/api/customers/get`,
      ruleGroup
    );

    return Response.json(response.data);
  } catch (error) {
    console.error("Error in /api/customers/get:", error.response?.data || error.message);
    return new Response(JSON.stringify({ message: "Failed to fetch customers" }), { status: 500 });
  }
}
