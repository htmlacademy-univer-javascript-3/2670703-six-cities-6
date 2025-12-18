import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import { createMockReview } from '../../test-utils/mocks';

describe('ReviewItem component', () => {
  it('should render review content', () => {
    const review = createMockReview();

    render(<ReviewItem review={review} />);

    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });
});
