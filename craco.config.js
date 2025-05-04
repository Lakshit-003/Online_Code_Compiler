module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          assert: require.resolve("assert/"),
          util: require.resolve("util/"),
          path: require.resolve("path-browserify"),
          stream: require.resolve("stream-browserify"),
          buffer: require.resolve("buffer/"),
          crypto: require.resolve("crypto-browserify"),
          process: require.resolve("process/browser"),
        },
      },
    },
  },
};
