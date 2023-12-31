export interface ISettings {
  id?: number;
  logo: string;
  popup_image?: string;
  favicon: string;
  footer_info: string;
  footer_copywrite: string;
  contact_number: string;
  contact_email: string;
  address: string;
  play_store_url?: string;
  app_store_url?: string;
  google_analytics?: string;
  facebook_pixel?: string;
  header_script?: string;
  footer_script?: string;
  facebook_url?: string;
  youtube_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  cash_on_message: null | string;
  online_payment_message: null | string;
  created_at?: string;
  updated_at?: string;
}

export interface ISettingsResponse {
  message: string;
  data: ISettings;
}
