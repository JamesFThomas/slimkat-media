import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import '@testing-library/jest-dom';

import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the Footer component', () => {
    render(<Footer />);

    expect(
      screen.getByText('© 2026 SlimKat Media. All rights reserved.')
    ).toBeInTheDocument();
  });
});
