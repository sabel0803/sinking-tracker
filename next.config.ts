import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // MOVE THIS OUTSIDE OF EXPERIMENTAL
  allowedDevOrigins: ['172.31.218.56', 'localhost:3000'],
  
};

export default nextConfig;