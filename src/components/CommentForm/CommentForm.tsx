import { ChangeEvent, FormEvent, Fragment, useState } from 'react';

function CommentForm() {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const ratingOptions = [5, 4, 3, 2, 1];
  const isSubmitDisabled = rating === '' || comment.length < 50;
  const ratingTitles: Record<number, string> = {
    5: 'perfect',
    4: 'good',
    3: 'not bad',
    2: 'badly',
    1: 'terribly',
  };

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingOptions.map((ratingOption) => (
          <Fragment key={ratingOption}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={ratingOption}
              id={`${ratingOption}-stars`}
              checked={rating === String(ratingOption)}
              type="radio"
              onChange={handleRatingChange}
            />
            <label htmlFor={`${ratingOption}-stars`} className="reviews__rating-label form__rating-label" title={ratingTitles[ratingOption]}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
