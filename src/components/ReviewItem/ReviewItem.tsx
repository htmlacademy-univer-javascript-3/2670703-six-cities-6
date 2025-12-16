type Review = {
  id: number;
  userName: string;
  userAvatarUrl: string;
  rating: number;
  comment: string;
  date: string;
  displayDate: string;
};

type ReviewItemProps = {
  review: Review;
};

function ReviewItem({ review }: ReviewItemProps) {
  const ratingWidth = `${review.rating * 20}%`;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.userAvatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {review.userName}
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
        <time className="reviews__time" dateTime={review.date}>{review.displayDate}</time>
      </div>
    </li>
  );
}

export type { Review };
export default ReviewItem;
