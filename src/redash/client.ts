import { QueriesResponse, Query } from "../@types/redash";
import axios from "axios";


export const fetchQueries = async (): Promise<Query[]> => {
  try {
    if (!process.env.REDASH_URL || !process.env.REDASH_API_KEY) throw "URL・API_KEY was not found"
    const response = await axios.get<QueriesResponse>(`${process.env.REDASH_URL}/api/queries?api_key=${process.env.REDASH_API_KEY}`);
    return response.data.results;
  } catch (e: any) {
    console.log(e);
    return []
  }
};