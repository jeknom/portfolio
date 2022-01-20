const CircularDependencyPlugin = require("circular-dependency-plugin");

module.exports = {
  images: {
    domains: ['i.imgur.com', 'www.youtube.com', 'img.youtube.com', 'lh3.googleusercontent.com'],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // DOCS: https://github.com/aackerman/circular-dependency-plugin
    if (dev) {
      config.plugins.push(new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        failOnError: true,
        allowAsyncCycles: false,
        cwd: process.cwd(),
      }));
    }

    return config
  }
};