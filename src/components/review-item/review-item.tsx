import { memo } from 'react';
import { RATING_MULTIPLIER } from '../../const';

type Review = {
  id: number;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  rating: number;
  comment: string;
  date: string;
};

type ReviewItemProps = {
  review: Review;
};

function ReviewItem({ review }: ReviewItemProps) {
  const roundedRating = Math.round(review.rating);
  const ratingWidth = `${roundedRating * RATING_MULTIPLIER}%`;
  const reviewDate = new Date(review.date);
  const formattedDate = reviewDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
  const machineDate = reviewDate.toISOString().split('T')[0];

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: ratingWidth }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={machineDate}>{formattedDate}</time>
      </div>
    </li>
  );
}

export type { Review };

const MemoizedReviewItem = memo(ReviewItem);

export default MemoizedReviewItem;
