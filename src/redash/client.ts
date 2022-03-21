import { QueriesResponse, Query } from "../@types/redash";
import axios from "axios";


export const fetchQueries = async (
  page=1, 
  pageSize=25
): Promise<QueriesResponse | undefined> => {
  try {
    if (!process.env.REDASH_URL || !process.env.REDASH_API_KEY) throw "URL・API_KEY was not found"
    const response = await axios.get<QueriesResponse>(`${process.env.REDASH_URL}/api/queries?api_key=${process.env.REDASH_API_KEY}&page=${page}&page_size=${pageSize}`);
    return response.data;
  } catch (e: any) {
    console.log(e);
    return;
  }
};

export const paginate = async (
  resource: (page: number, pageSize: number) => Promise<QueriesResponse | undefined>, 
  page = 1, 
  pageSize = 25
): Promise<Query[]> => {
  try {
    const response = await resource(page, pageSize)
    if (!response) {
      throw 'fetch error'
    }
    if (response.page * response.page_size >= response.count) {
      return response.results;
    } 
    const nextPageResponse = await paginate(resource, page = page + 1, pageSize);
    return [
      ...response.results,
      ...nextPageResponse
    ]
  } catch (e: any) {
    console.log(e);
    return []
  }
}