export interface Subject {
  name: string;
  id: string;
}

export interface Activitie {
  deadLine: string;
  link: string;
  subject_id: string;
  description: string;
  id: string;
}

interface AppMetadata {
  provider: string;
  providers: any;
}

interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: AppMetadata;
  user_metadata: any;
  identities: any;
  created_at: string;
  updated_at: string;
}

export interface SessionType {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user: User;
  expires_at: number;
}