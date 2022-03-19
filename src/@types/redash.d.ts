declare namespace Redash {
  export type Schedule = {
      interval: number;
      until?: any;
      day_of_week?: any;
      time?: any;
  }

  export type User = {
      auth_type: string;
      is_disabled: boolean;
      updated_at: Date;
      profile_image_url: string;
      is_invitation_pending: boolean;
      groups: number[];
      id: number;
      name: string;
      created_at: Date;
      disabled_at?: any;
      is_email_verified: boolean;
      active_at: Date;
      email: string;
  }

  export type Options = {
      parameters: any[];
  }

  export type Query = {
      is_archived: boolean;
      retrieved_at: Date;
      updated_at: Date;
      is_favorite: boolean;
      query: string;
      id: number;
      description?: any;
      last_modified_by_id: number;
      tags: string[];
      version: number;
      query_hash: string;
      api_key: string;
      data_source_id: number;
      is_safe: boolean;
      latest_query_data_id: number;
      schedule: Schedule;
      user: User;
      is_draft: boolean;
      name: string;
      created_at: Date;
      runtime: number;
      options: Options;
  }

  export type QueriesResponse =  {
      count: number;
      page: number;
      page_size: number;
      results: Query[];
  }
}