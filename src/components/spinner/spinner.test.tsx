import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Spinner component', () => {
  it('should render default text', () => {
    render(<Spinner />);

    expect(screen.getByText('Loading offers, please wait...')).toBeInTheDocument();
  });

  it('should render custom text', () => {
    render(<Spinner text="Please wait" />);

    expect(screen.getByText('Please wait')).toBeInTheDocument();
  });
});
