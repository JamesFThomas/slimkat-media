import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import '@testing-library/jest-dom';

import { SubscriptionForm } from './SubscriptionForm';

describe('SubscriptionForm', () => {
  it('renders the SubscriptionForm component', () => {
    render(<SubscriptionForm />);

    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Subscribe' })
    ).toBeInTheDocument();
  });
});
