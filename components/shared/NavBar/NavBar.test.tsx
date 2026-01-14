import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import '@testing-library/jest-dom';

import { NavBar } from './NavBar';

describe('NavBar', () => {
  it('renders the NavBar component', () => {
    render(<NavBar />);

    expect(screen.getByAltText('SlimKat Media Logo')).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'Toggle language' })
    ).toBeInTheDocument();
  });
});
