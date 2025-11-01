
export type Page = 'Home' | 'News' | 'Report' | 'Chat' | 'Resources';

export interface NewsArticle {
  title: string;
  summary: string;
  category: string;
  date: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface Report {
  id: string;
  incidentType: string;
  date: string;
  description: string;
  status: 'Submitted';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Resource {
  title: string;
  description: string;
  link: string;
  category: 'Helpline' | 'Guide';
}
