import axios from "axios";

export const fetchJobsFromAdzuna = async ({ query, page }) => {
  const APP_ID = process.env.ADZUNA_APP_ID;
  const APP_KEY = process.env.ADZUNA_APP_KEY;

  if (!APP_ID || !APP_KEY) {
    throw new Error("Missing Adzuna credentials");
  }

  const url = `https://api.adzuna.com/v1/api/jobs/in/search/${page}`;

  const response = await axios.get(url, {
    params: {
      app_id: APP_ID,
      app_key: APP_KEY,
      what: query,
      results_per_page: 20,
    },
    headers: {
      Accept: "application/json",
    },
  });

  return response.data;
};
