import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

function throwError(envVar: string) {
  throw `Abort: You need to define ${envVar} in the .env file.`;
}

if (!process.env.RESEND_API_KEY) {
  throwError('RESEND_API_KEY');
}

const nextConfig: NextConfig = {
  allowedDevOrigins: ['http://localhost:3000', 'http://192.168.1.66:3000'],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
