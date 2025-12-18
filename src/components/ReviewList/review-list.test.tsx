import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewList from './review-list';
import type { Review } from '../ReviewItem/review-item';
import { createMockReview } from '../../test-utils/mocks';

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
