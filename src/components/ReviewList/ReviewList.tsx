import ReviewItem, { Review } from '../ReviewItem/ReviewItem';

type ReviewListProps = {
  reviews: Review[];
};

function ReviewList({ reviews }: ReviewListProps) {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem review={review} key={review.id} />
      ))}
    </ul>
  );
}

export type { ReviewListProps };
export default ReviewList;
