import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewItem, { type Review } from './ReviewItem';

const createMockReview = (overrides?: Partial<Review>): Review => ({
  id: 1,
  user: {
    name: 'User',
    avatarUrl: 'img/avatar.jpg',
    isPro: false
  },
  rating: 4,
  comment: 'Mock comment',
  date: '2020-01-01T00:00:00.000Z',
  ...overrides
});

describe('ReviewItem component', () => {
  it('should render review content', () => {
    const review = createMockReview();

    render(<ReviewItem review={review} />);

    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });
});


