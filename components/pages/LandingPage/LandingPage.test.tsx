import { render, screen } from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import '@testing-library/jest-dom';


describe('LandingPage', () => {
  it('renders the LandingPage component', async () => {

    jest.doMock('../../shared/NavBar/NavBar', () => ({
      NavBar: () => <nav>NavBar Mock</nav>,
    }));

    jest.doMock('../../shared/Footer/Footer', () => ({
      Footer: () => <footer>Footer Mock</footer>,
    }));

    jest.doMock('../../shared/SubscriptionForm/SubscriptionForm', () => ({
      SubscriptionForm: () => <form>SubscriptionForm Mock</form>,
    }));

    const { LandingPage } = await import('./LandingPage');

    render(<LandingPage />);

    expect(screen.getByText('NavBar Mock')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Welcome to SlimKat Media' })
    ).toBeInTheDocument();

    expect(screen.getByText('Your podcasting partner')).toBeInTheDocument();

    expect(screen.getAllByText('SubscriptionForm Mock')).toHaveLength(2);

    expect(screen.getByAltText('Podcast Studio Image 1')).toBeInTheDocument();

    expect(screen.getByAltText('Podcast Studio Image 2')).toBeInTheDocument();

    expect(screen.getByText('Footer Mock')).toBeInTheDocument();
  });
});
