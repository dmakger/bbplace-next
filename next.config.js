module.exports = {
  reactStrictMode: true,
  experimental: {
    // This is experimental but can
    // be enabled to allow parallel threads
    // with nextjs automatic static generation
    workerThreads: false,
    cpus: 1
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bbplace.ru',
        pathname: '/fileservice/api/FilesS3/GetFile/**',
      },

      {
        protocol: 'https',
        hostname: 'hb.bizmrg.com',
        pathname: '/image_store/**',
      },
    ]
  },
  output: "standalone",
}