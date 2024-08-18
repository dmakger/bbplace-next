module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['bbplace.ru'],
  },
  experimental: {
    // This is experimental but can
    // be enabled to allow parallel threads
    // with nextjs automatic static generation
    workerThreads: false,
    cpus: 1
  },
  output: "standalone",
}