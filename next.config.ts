import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com", "i.pravatar.cc"],
  },
};

export default nextConfig;
