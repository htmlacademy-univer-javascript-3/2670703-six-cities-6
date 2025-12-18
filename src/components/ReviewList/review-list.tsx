import { memo } from 'react';
import ReviewItem, { Review } from '../ReviewItem/review-item';

type ReviewListProps = {
  reviews: Review[];
};

function ReviewList({ reviews }: ReviewListProps) {
  const sortedLimitedReviews = [...reviews]
    .sort((firstReview, secondReview) => new Date(secondReview.date).getTime() - new Date(firstReview.date).getTime())
    .slice(0, 10);

  return (
    <ul className="reviews__list">
      {sortedLimitedReviews.map((review) => (
        <ReviewItem review={review} key={review.id} />
      ))}
    </ul>
  );
}

export type { ReviewListProps };

const MemoizedReviewList = memo(ReviewList);

export default MemoizedReviewList;
