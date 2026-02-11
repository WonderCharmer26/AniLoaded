import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getDiscussionById,
  getDiscussionComments,
} from "../services/api/discussionService";
import LoadingSpinner from "../components/LoadingSpinner";

export default function DiscussionInfoPage() {
  // get the discussion id from the url
  const { id } = useParams<{ id: string }>();

  // Fetch discussion data (already prefetched by loader)
  const { data: discussion, isLoading: discussionLoading } = useQuery({
    queryKey: ["discussion", id],
    queryFn: () => getDiscussionById(id!),
    enabled: !!id, // only when id
  });

  // Fetch comments data (already prefetched by loader)
  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ["discussionComments", id],
    queryFn: () => getDiscussionComments(id!),
    enabled: !!id, // only when id
  });

  // Show loading state (might adjust later on)
  if (discussionLoading) {
    return <LoadingSpinner />;
  }

  // Handle missing discussion edge case
  if (!discussion) {
    return (
      <div className="px-6 py-10 text-center">
        <p className="text-white">Discussion not found</p>
      </div>
    );
  }

  return (
    // TODO: Tweak the UI later on
    <div className="px-6 py-10 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Discussion Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">{discussion.title}</h1>
        </div>

        {/* Thumbnail */}
        {discussion.thumbnail_url && (
          <img
            src={discussion.thumbnail_url}
            alt={discussion.title}
            className="w-full h-96 object-cover rounded-xl"
          />
        )}
        {/*Discussion stats*/}
        <div className="flex gap-4 text-sm text-slate-400">
          <span>{discussion.comment_count} replies</span>
          <span>·</span>
          <span>{discussion.upvote_count} upvotes</span>
          <span>·</span>
          <span>
            Posted {new Date(discussion.created_at).toLocaleDateString()}
          </span>
        </div>

        {/* Discussion Body */}
        <div className="text-slate-300">
          <p>{discussion.body}</p>
        </div>

        {/* Comments Section */}
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Comments ({comments.length})
          </h2>

          {commentsLoading ? (
            <p className="text-sm text-slate-400">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-sm text-slate-400">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border border-slate-700 rounded-lg p-4 space-y-2"
                >
                  <div className="flex gap-2 text-xs text-slate-400">
                    <span>{comment.created_by}</span>
                    <span>·</span>
                    <span>
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-300">{comment.body}</p>
                  {comment.is_spoiler && (
                    <span className="text-xs text-red-400">⚠️ Spoiler</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
