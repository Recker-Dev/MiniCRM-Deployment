import axios from "axios";

export async function POST(req) {
  try {
    const { campaignName, campaignObjective } = await req.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URI}/api/ai/campaign`,
      { campaignName, campaignObjective }
    );
    console.log(response);
    return Response.json(response.data);
  } catch (error) {
    console.error("Error in /api/ai/campaign:", error.response?.data || error.message);
    return new Response(JSON.stringify({ message: "AI suggestion generation failed" }), { status: 500 });
  }
}
