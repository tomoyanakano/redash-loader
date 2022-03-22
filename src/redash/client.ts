import { Response } from "../@types/redash";
import axios from "axios";

export class RedashClient {
  constructor(protected apiKey: string, protected url: string) {
    this.apiKey = apiKey;
    this.url = url;
  }

  fetchQueries = async (
    page = 1,
    pageSize = 25
  ): Promise<Response | undefined> => {
    try {
      const response = await axios.get<Response>(
        `${this.url}/api/queries?api_key=${this.apiKey}&page=${page}&page_size=${pageSize}`
      );
      return response.data;
    } catch (e: any) {
      console.log(e);
      return;
    }
  };

  fetchDashboards = async (
    page = 1,
    pageSize = 25
  ): Promise<Response | undefined> => {
    try {
      const response = await axios.get<Response>(
        `${this.url}/api/dashboards?api_key=${this.apiKey}&page=${page}&page_size=${pageSize}`
      );
      return response.data;
    } catch (e: any) {
      console.log(e);
      return;
    }
  };

  paginate = async <T>(
    resource: (page: number, pageSize: number) => Promise<Response | undefined>,
    page = 1,
    pageSize = 25
  ): Promise<Array<T>> => {
    try {
      const response = await resource(page, pageSize);
      if (!response) {
        throw "fetch error";
      }
      if (response.page * response.page_size >= response.count) {
        return response.results as unknown as Array<T>;
      }
      const nextPageResponse = await this.paginate(
        resource,
        (page = page + 1),
        pageSize
      );
      return [...response.results, ...nextPageResponse] as Array<T>;
    } catch (e: any) {
      console.log(e);
      return [];
    }
  };
}
