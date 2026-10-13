import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://localhost:3000", "http://192.168.1.66:3000"],
  async redirects() {
    return [
      {
        source: "/foundation",
        destination: "https://jktfoundation.org",
        permanent: true,
      },
      {
        source: "/fr/foundation",
        destination: "https://jktfoundation.org",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.farmingfreedommovie.com" }],
        destination: "https://www.slimkatmedia.com/productions",
        permanent: false,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "farmingfreedommovie.com" }],
        destination: "https://www.slimkatmedia.com/productions",
        permanent: false,
      },
      {
        source: "/fr/:path*",
        has: [{ type: "host", value: "www.farmingfreedommovie.com" }],
        destination: "https://www.slimkatmedia.com/fr/productions",
        permanent: false,
      },
      {
        source: "/fr/:path*",
        has: [{ type: "host", value: "farmingfreedommovie.com" }],
        destination: "https://www.slimkatmedia.com/fr/productions",
        permanent: false,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
