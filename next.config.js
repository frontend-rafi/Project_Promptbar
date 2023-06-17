
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      externalDir: true | {
        enabled: true,
        silent: true,
   },
      appDir: true,
      disableExperimentalFeaturesWarning: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  
  module.exports = nextConfig