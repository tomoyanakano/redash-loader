export interface Schedule {
  interval: number;
  until?: any;
  day_of_week?: any;
  time?: any;
}

export interface User {
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

export interface Options {
  parameters: any[];
}

export interface Query {
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

export interface Dashboard {
  tags: any[];
  is_archived: boolean;
  updated_at: Date;
  is_favorite: boolean;
  user: User;
  layout: any[];
  is_draft: boolean;
  id: number;
  user_id: number;
  name: string;
  created_at: Date;
  slug: string;
  version: number;
  widgets?: any;
  dashboard_filters_enabled: boolean;
}

export interface Response {
  count: number;
  page: number;
  page_size: number;
  results: Query[] | Dashboard[];
}
