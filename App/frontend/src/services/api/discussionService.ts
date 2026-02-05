import "axios";
import axios from "axios";
import {
  Discussions,
  DiscussionsResponse,
  DiscussionsComments,
} from "../../schemas/discussion";
import { backendUrl } from "./fetchAnimes";

// dummy data (won't need soon)

export async function getDiscussionThreads(): Promise<[]> {
  return [];
}

export async function getAllDiscussions(): Promise<Discussions[]> {
  const res = await axios.get<DiscussionsResponse>(`${backendUrl}/discussions`);
  return res.data.data;
}

export async function getDiscussionById(id: string): Promise<Discussions> {
  const res = await axios.get<Discussions>(`${backendUrl}/discussions/${id}`);
  return res.data;
}

export async function getDiscussionComments(
  discussionId: string
): Promise<DiscussionsComments[]> {
  const res = await axios.get<{ data: DiscussionsComments[]; total: number }>(
    `${backendUrl}/discussions/${discussionId}/comments`
  );
  return res.data.data;
}
