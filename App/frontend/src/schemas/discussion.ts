// Types describing anime discussion primitives used across the app

export interface DiscussionThread {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  avatarUrl?: string;
  tags: string[];
  replies: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface DiscussionTopic {
  id: string;
  label: string;
  mentions: number;
}

export interface DiscussionPrompt {
  id: string;
  question: string;
  description?: string;
}
