/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_CLI_BASE_URL || "https://uniform.app",
    previewSecret: process.env.UNIFORM_PREVIEW_SECRET || "hello-world",
    projectMapId: process.env.UNIFORM_PROJECT_MAP_ID,
    gatherContentConfig:{
      GATHER_CONTENT_USERNAME: process.env.GATHER_CONTENT_USERNAME,
      GATHER_CONTENT_API_KEY: process.env.GATHER_CONTENT_API_KEY,
      GATHER_CONTENT_PROJECT_ID: process.env.GATHER_CONTENT_PROJECT_ID
    },
    sitecoreConfig:{
      SITECORE_API_URL:process.env.SITECORE_API_URL,
      SITECORE_API_KEY:process.env.SITECORE_API_KEY,
      SITECORE_SITENAME:process.env.SITECORE_SITENAME
    }
  },
  // webpack: (config) => {
  //   config.resolve.alias['@/uniformlib'] = path.resolve(__dirname, './src/lib');
  //
  //   return config
  // },
};

module.exports = nextConfig;
