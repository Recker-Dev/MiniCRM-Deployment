import axios from "axios";

export async function getCustomerDetails(ruleGroup) {
  const response = await axios.post(`/api/customers/get`, ruleGroup);
  const data = response.data;

  return Array.isArray(data)
    ? { size: data.length, customers: data }
    : { size: 0, customers: [] };
}

export const getUserCampaigns = async (userId) => {
  const response = await axios.post(`/api/campaigns/get`, { userId });
  return response.data;
};

export const saveCampaignApi = async (payload) => {
  const response = await axios.post(`/api/campaigns/post`, payload);
  return response.data;
};

export async function generateAISuggestions(campaignName, campaignObjective) {
  try {
    const response = await axios.post(`/api/ai/campaign`, {
      campaignName,
      campaignObjective,
    });

    const data = response.data;
    // console.log(data);

    if (data?.suggestions && Array.isArray(data.suggestions)) {
      return { success: true, suggestions: data.suggestions };
    } else {
      console.error("Invalid AI response:", data);
      return { success: false, suggestions: [] };
    }
  } catch (error) {
    console.error(
      "Error in generateAISuggestions:",
      error.response?.data || error.message
    );
    return { success: false, suggestions: [] };
  }
}

export async function generateAIRules(query) {
  try {
    const response = await axios.post(`/api/ai/dynamic`, { query });
    const data = response.data;

    if (data && typeof data.ruleGroup === "object") {
      return { success: true, ruleGroup: data.ruleGroup };
    } else {
      console.error("Invalid AI rule response:", data);
      return { success: false, ruleGroup: null };
    }
  } catch (error) {
    console.error(
      "Error in generateAIRules:",
      error.response?.data || error.message
    );
    return { success: false, ruleGroup: null };
  }
}
