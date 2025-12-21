import { memo } from 'react';
import ReviewItem, { Review } from '../review-item/review-item';
import { REVIEW_LIMIT } from '../../const';

type ReviewListProps = {
  reviews: Review[];
};

function ReviewList({ reviews }: ReviewListProps) {
  const sortedLimitedReviews = [...reviews]
    .sort((firstReview, secondReview) => new Date(secondReview.date).getTime() - new Date(firstReview.date).getTime())
    .slice(0, REVIEW_LIMIT);

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
