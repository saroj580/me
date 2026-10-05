
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  liveUrl?: string | null;
  repoUrl?: string | null;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  status: "UNREAD" | "READ" | "REPLIED";
  createdAt: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  body: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  current?: boolean;
}

export interface TechSkill {
  name: string;
  category: "frontend" | "backend" | "devops" | "tools" | "languages";
  level: "beginner" | "intermediate" | "advanced" | "expert";
  iconUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}


export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };
