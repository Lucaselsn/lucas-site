import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework/version to attackers
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Stop other sites from embedding yours in an iframe (clickjacking)
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Don't let browsers guess/execute files as the wrong type
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Only send the origin (not full URL) when navigating away
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Lock down powerful device APIs the site never uses
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // Force HTTPS for two years (HSTS)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
