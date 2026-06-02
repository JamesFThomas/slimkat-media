import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://localhost:3000", "http://192.168.1.66:3000"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "jktfoundation.org" }],
        destination: "https://slimkatmedia.com/foundation",
        permanent: false,
      },
      {
        source: "/fr/:path*",
        has: [{ type: "host", value: "jktfoundation.org" }],
        destination: "https://slimkatmedia.com/fr/foundation",
        permanent: false,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
