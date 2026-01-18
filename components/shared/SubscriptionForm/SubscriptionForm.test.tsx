import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { SubscriptionForm } from './SubscriptionForm';

describe('SubscriptionForm', () => {
  it('renders the SubscriptionForm component', () => {
    render(<SubscriptionForm />);

    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Subscribe' }),
    ).toBeInTheDocument();
  });

  it('submit button is disabled when email is empty', () => {
    render(<SubscriptionForm />);

    const input = screen.getByPlaceholderText(
      'Enter your email',
    ) as HTMLInputElement;
    const subscribeButton = screen.getByRole('button', { name: 'Subscribe' });
    expect(subscribeButton).toBeDisabled();
    expect(input.value).toBe('');
  });

  it('shows error message for invalid email format', async () => {
    render(<SubscriptionForm />);

    const input = screen.getByPlaceholderText(
      'Enter your email',
    ) as HTMLInputElement;
    const subscribeButton = screen.getByRole('button', { name: 'Subscribe' });

    await userEvent.type(input, 'invalid-email');
    await userEvent.click(subscribeButton);

    expect(
      screen.getByText('email@address.com format is required'),
    ).toBeInTheDocument();
  });

  it('enables submit button for valid email and clears input after submit', async () => {
    render(<SubscriptionForm />);

    const input = screen.getByPlaceholderText(
      'Enter your email',
    ) as HTMLInputElement;
    const subscribeButton = screen.getByRole('button', { name: 'Subscribe' });

    await userEvent.type(input, 'valid@example.com');
    expect(subscribeButton).toBeEnabled();

    await userEvent.click(subscribeButton);
    expect(input.value).toBe('');
  });
});
