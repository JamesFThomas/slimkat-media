// jest.setup.tsx
import React from 'react';
import '@testing-library/jest-dom/jest-globals';

import { jest } from '@jest/globals';

// Global component mocks so they apply before the module graph loads
jest.mock('./components/shared/NavBar', () => ({
  NavBar: () => <nav>NavBar Mock</nav>,
}));

jest.mock('./components/shared/Footer', () => ({
  Footer: () => <footer>Footer Mock</footer>,
}));

jest.mock('./components/shared/SubscriptionForm', () => ({
  SubscriptionForm: () => <form>SubscriptionForm Mock</form>,
}));
