import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentForm from './comment-form';

describe('CommentForm component', () => {
  it('should disable submit button when rating or comment is invalid', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<CommentForm onSubmit={handleSubmit} />);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeDisabled();

    await user.click(screen.getByDisplayValue('5'));

    expect(submitButton).toBeDisabled();

    await user.type(
      screen.getByRole('textbox', {
        name: 'Your review'
      }),
      'Too short comment'
    );

    expect(submitButton).toBeDisabled();
  });

  it('should call onSubmit with valid data when form is submitted', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<CommentForm onSubmit={handleSubmit} />);

    await user.click(screen.getByDisplayValue('5'));

    const commentText = 'a'.repeat(55);
    await user.type(
      screen.getByRole('textbox', {
        name: 'Your review'
      }),
      ` ${commentText} `
    );

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeEnabled();

    await user.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      rating: 5,
      comment: commentText
    });
  });

  it('should reset form when isSubmitting changes from true to false', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    const { rerender } = render(
      <CommentForm onSubmit={handleSubmit} isSubmitting />
    );

    await user.click(screen.getByDisplayValue('5'));
    await user.type(
      screen.getByRole('textbox', {
        name: 'Your review'
      }),
      'a'.repeat(55)
    );

    rerender(<CommentForm onSubmit={handleSubmit} isSubmitting={false} />);

    expect(screen.getByRole('textbox', { name: 'Your review' })).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });
});
