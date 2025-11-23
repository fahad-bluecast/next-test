export interface Response {
  success: boolean;
  message: string;
  access_token?: string;
  refresh_token?: string;
  login: boolean;
}
