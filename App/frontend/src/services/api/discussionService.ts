import "axios";
import axios from "axios";
import {
  Discussion,
  DiscussionsResponse,
  DiscussionsComments,
  DiscussionRequest,
  DiscussionResponse,
} from "../../schemas/discussion";
import { backendUrl } from "./fetchAnimes";

// dummy data (won't need soon)

export async function getDiscussionThreads(): Promise<[]> {
  return [];
}

export async function getAllDiscussions(): Promise<Discussion[]> {
  const res = await axios.get<DiscussionsResponse>(`${backendUrl}/discussions`);
  return res.data.data;
}

export async function getDiscussionById(id: string): Promise<Discussion> {
  const res = await axios.get<Discussion>(`${backendUrl}/discussions/${id}`);
  return res.data;
}

export async function getDiscussionComments(
  discussionId: string,
): Promise<DiscussionsComments[]> {
  const res = await axios.get<{ data: DiscussionsComments[]; total: number }>(
    `${backendUrl}/discussions/${discussionId}/comments`,
  );
  return res.data.data;
}

// Post
export async function submitDiscussion({
  title,
  body,
  thumbnail,
  is_locked,
  is_spoiler,
}: DiscussionRequest): Promise<DiscussionResponse> {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  formData.append("is_locked", String(is_locked));
  formData.append("is_spoiler", String(is_spoiler));
  if (thumbnail) formData.append("thumbnail", thumbnail);

  const res = await axios.post(`${backendUrl}/discussion`, formData);

  if (!res.data) throw new Error("Error posting discussion");
  return res.data;
}
