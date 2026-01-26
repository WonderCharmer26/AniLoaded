import "axios";
import axios from "axios";
import { Discussions, DiscussionsResponse } from "../../schemas/discussion";
import { backendUrl } from "./fetchAnimes";

// dummy data (won't need soon)

export async function getDiscussionThreads(): Promise<[]> {
  return [];
}

export async function getAllDiscussions(): Promise<Discussions[]> {
  const res = await axios.get<DiscussionsResponse>(`${backendUrl}/discussions`);
  return res.data.data;
}
