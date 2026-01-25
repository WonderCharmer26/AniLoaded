// TODO: Make functions that get real discussion from the database
import type {
  DiscussionThread,
  DiscussionTopic,
} from "../../schemas/discussion";

// TODO: Work on making the calls to the backend

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// dummy data (won't need soon)
const mockThreads: DiscussionThread[] = [
  {
    id: "thread-1",
    title: "Is the 90s still the golden era of anime?",
    excerpt:
      "From Evangelion to Cowboy Bebop, fans keep returning to 90s series. What gives them staying power?",
    author: "RetroRin",
    tags: ["RETRO", "MECHA"],
    replies: 48,
    likes: 132,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "thread-2",
    title: "Seasonal hot take: Skip the hype and watch sleepers",
    excerpt:
      "Share your favorite under-the-radar picks from the current season before everyone else notices them.",
    author: "SleeperSensei",
    tags: ["SEASONAL", "SLICE OF LIFE"],
    replies: 21,
    likes: 67,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "thread-3",
    title: "Villain redemption arcs that actually worked",
    excerpt:
      "Let\'s talk about antagonists who earned their redemption instead of getting one handed to them.",
    author: "PanelPusher",
    tags: ["CHARACTERS"],
    replies: 35,
    likes: 94,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockTopics: DiscussionTopic[] = [
  { id: "topic-1", label: "Winter 2025", mentions: 320 },
  { id: "topic-2", label: "Sports Anime", mentions: 188 },
  { id: "topic-3", label: "Best OST", mentions: 154 },
  { id: "topic-4", label: "Peak Villains", mentions: 98 },
];

export async function getDiscussionThreads(): Promise<DiscussionThread[]> {
  await delay(250);
  return mockThreads;
}

export async function getTrendingTopics(): Promise<DiscussionTopic[]> {
  await delay(150);
  return mockTopics;
}
