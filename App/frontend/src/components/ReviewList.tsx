// TODO: Edit the styling and the orientation for the title and subtitle
import React from "react";
import { ReviewCard } from "./ReviewCard";

interface Review {
  id: number;
  avatarUrl: string;
  username: string;
  reviewDate: string;
  comment: string;
  likes: number;
}

const mockReviews: Review[] = [
  {
    id: 1,
    avatarUrl:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=256&q=80",
    username: "StarryOtaku",
    reviewDate: "March 2, 2024",
    comment:
      "Absolutely loved the pacing and world building. Every episode left me wanting more and the soundtrack is top tier.",
    likes: 128,
  },
  {
    id: 2,
    avatarUrl:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=256&q=80",
    username: "MechaMuse",
    reviewDate: "February 26, 2024",
    comment:
      "The character development this season surprised me. Secondary characters finally got the spotlight they deserved.",
    likes: 96,
  },
  {
    id: 3,
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    username: "SliceOfLife",
    reviewDate: "January 15, 2024",
    comment:
      "Warm, wholesome, and beautifully animated. Perfect comfort watch with a message that sticks with you.",
    likes: 87,
  },
];

export const ReviewList: React.FC = () => {
  return (
    <section className="mt-10 flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-bold text-[#246C99]">Fan Reviews</h2>
        <p className="text-sm mb-3 text-gray-400">
          See what other viewers are saying about their favorite series.
        </p>
      </div>
      <div className="flex w-full gap-4 overflow-x-auto no-scrollbar pb-4 justify-center">
        {mockReviews.map((review) => (
          <div key={review.id} className="flex-shrink-0">
            <ReviewCard {...review} />
          </div>
        ))}
      </div>
    </section>
  );
};
