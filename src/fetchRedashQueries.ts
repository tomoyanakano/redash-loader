import axios from "axios";

const fetchRedashQueries = async (): Promise<Redash.Query[]> => {
  try {
    if (!process.env.REDASH_URL || !process.env.REDASH_API_KEY) return [];
    const response = await axios.get<Redash.QueriesResponse>(`${process.env.REDASH_URL}/api/queries?api_key=${process.env.REDASH_API_KEY}`);
    return response.data.results;
  } catch (e: any) {
    console.log(e);
    return []
  }
};

export default fetchRedashQueries;
