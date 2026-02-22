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

export async function getDiscussionThreads(): Promise<[]> {
  return [];
}

export async function getAllDiscussions(): Promise<Discussion[]> {
  const res = await axios.get<DiscussionsResponse>(`${backendUrl}/discussions`);
  return res.data.data;
}

// get the specific discussions
export async function getDiscussionById(id: string): Promise<Discussion> {
  const res = await axios.get<Discussion>(`${backendUrl}/discussions/${id}`);
  return res.data;
}

// function for the discussion comments
export async function getDiscussionComments(
  discussionId: string,
): Promise<DiscussionsComments[]> {
  const res = await axios.get<{ data: DiscussionsComments[]; total: number }>(
    `${backendUrl}/discussions/${discussionId}/comments`,
  );
  return res.data.data;
}

// Subits discussion to the backend
export async function submitDiscussion({
  anime_id,
  category_id,
  title,
  body,
  episode_number,
  season_number,
  thumbnail,
  is_locked,
  is_spoiler,
}: DiscussionRequest): Promise<DiscussionResponse> {
  const formData = new FormData();
  formData.append("anime_id", String(anime_id));
  formData.append("category_id", category_id);
  formData.append("title", title);
  formData.append("body", body);
  if (episode_number !== undefined) {
    formData.append("episode_number", String(episode_number));
  }
  if (season_number !== undefined) {
    formData.append("season_number", String(season_number));
  }
  formData.append("is_locked", String(is_locked)); // make bool on the backend (form doesn't take bools)
  formData.append("is_spoiler", String(is_spoiler)); // make bool on the backend (form doesn't take bools)

  // add the thumbnail file if user uploads one
  if (thumbnail) formData.append("thumbnail", thumbnail);

  const res = await axios.post(`${backendUrl}/discussion`, formData);

  if (!res.data) throw new Error("Error posting discussion");
  return res.data;
}
