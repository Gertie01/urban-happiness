// next.config.mjs
// @ts-check

import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants.js'

export default (phase) => {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    // Image optimization
    images: {
      formats: ['image/avif', 'image/webp'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
      // Optimize for image-heavy apps
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // React settings
    reactStrictMode: true,
    swcMinify: true,

    // Environment variables
    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    },

    // Development vs Production
    ...(phase === PHASE_DEVELOPMENT_SERVER && {
      typescript: {
        tsconfigPath: './tsconfig.json',
      },
    }),

    // Security headers
    headers: async () => {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
          ],
        },
      ]
    },

    // Redirects
    redirects: async () => {
      return []
    },

    // Rewrites for API routing
    rewrites: async () => {
      return {
        beforeFiles: [
          // API rewrites if needed
        ],
      }
    },
  }

  return nextConfig
}
