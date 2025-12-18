// TODO: Edit the styling for the review cards
import React from "react";
import { Heart } from "lucide-react";

interface ReviewCardProps {
  avatarUrl: string;
  username: string;
  reviewDate: string;
  comment: string;
  likes: number;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  avatarUrl,
  username,
  reviewDate,
  comment,
  likes,
}) => {
  return (
    <div className="flex h-full w-[400px] flex-col rounded-2xl bg-[#1A2227] p-5 text-white">
      <div className="flex flex-row items-start gap-3">
        <img
          src={avatarUrl}
          alt={`${username} profile photo`}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex flex-col items-start">
          <span className="text-base font-semibold">{username}</span>
          <span className="text-sm text-gray-400">{reviewDate}</span>
        </div>
      </div>
      <p className="mt-4 mb-4 text-sm leading-relaxed text-gray-100">
        {comment}
      </p>
      <div className="mt-auto flex justify-end">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Heart
            fill="#FF5A5F"
            className="h-5 w-5 text-[#FF5A5F]"
            aria-hidden
          />
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};
