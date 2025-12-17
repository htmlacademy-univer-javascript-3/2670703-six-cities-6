import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewList from './ReviewList';
import type { Review } from '../ReviewItem/ReviewItem';

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

describe('ReviewList component', () => {
  it('should render list of reviews', () => {
    const reviews: Review[] = [
      createMockReview({ id: 1, comment: 'First comment' }),
      createMockReview({ id: 2, comment: 'Second comment' })
    ];

    render(<ReviewList reviews={reviews} />);

    expect(screen.getByText('First comment')).toBeInTheDocument();
    expect(screen.getByText('Second comment')).toBeInTheDocument();
  });
});


