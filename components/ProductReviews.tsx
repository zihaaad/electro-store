"use client";

import React, {useState} from "react";
import {useUser} from "@clerk/nextjs";
import {Button} from "./ui/button";
import {StarIcon} from "lucide-react";
import {Textarea} from "./ui/textarea";
import {formatDistanceToNow} from "date-fns";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useToast} from "./ui/use-toast";

type Review = {
  _id: string;
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
  isVerified: boolean;
};

type ProductReviewsProps = {
  productId: string;
  reviews: Review[];
  avgRating: number;
  reviewCount: number;
  canReview: boolean;
};

const ProductReviews = ({
  productId,
  reviews,
  avgRating,
  reviewCount,
  canReview,
}: ProductReviewsProps) => {
  const {user, isSignedIn} = useUser();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {toast} = useToast();
  const router = useRouter();

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn || !user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to leave a review",
        variant: "destructive",
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        title: "Review required",
        description: "Please write a review comment",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          rating,
          comment,
          userName: user.fullName || user.username || "Anonymous",
          userEmail: user.primaryEmailAddress?.emailAddress,
          clerkUserId: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });

      setComment("");
      router.refresh();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "Failed to submit your review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="md:max-w-2xl">
      <h3 className="text-xl font-bold mb-6">Customer Reviews</h3>

      {/* Review Summary */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold text-shop_dark_green">
            {avgRating ? avgRating.toFixed(1) : "0.0"}
          </div>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                size={16}
                className="text-shop_light_green"
                fill={i < Math.round(avgRating) ? "#3b9c3c" : "transparent"}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
          </div>
        </div>

        <div className="flex-1 ml-4">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter(
              (r) => Math.round(r.rating) === star
            ).length;
            const percentage =
              reviewCount > 0 ? (count / reviewCount) * 100 : 0;

            return (
              <div key={star} className="flex items-center gap-2 mb-1">
                <div className="text-sm w-6">{star}</div>
                <StarIcon
                  size={14}
                  className="text-shop_light_green"
                  fill="#3b9c3c"
                />
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-shop_dark_green rounded-full"
                    style={{width: `${percentage}%`}}
                  />
                </div>
                <div className="text-xs text-gray-500 w-10">{count}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Form */}
      {canReview && (
        <form
          onSubmit={handleSubmitReview}
          className="mb-10 p-6 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Write a Review</h4>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none">
                  <StarIcon
                    size={24}
                    className="text-shop_light_green"
                    fill={star <= rating ? "#3b9c3c" : "transparent"}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              Review
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              rows={4}
              className="w-full"
              required
            />
          </div>

          <Button
            type="submit"
            className="bg-shop_dark_green hover:bg-shop_light_green text-white"
            disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </Button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        size={16}
                        className="text-shop_light_green"
                        fill={i < review.rating ? "#3b9c3c" : "transparent"}
                      />
                    ))}
                  </div>
                  <h4 className="font-semibold">{review.userName}</h4>
                </div>
                <div className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                  })}
                  {review.isVerified && (
                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No reviews yet. Be the first to review this product!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
