const path = require('path');

module.exports = {
  webpack: (config, env) => {
    if (env === 'production') {
      // Disable CSS minimization in production
      if (config.optimization && config.optimization.minimizer) {
        config.optimization.minimizer = config.optimization.minimizer.filter(
          (minimizer) => {
            const name = minimizer.constructor.name;
            return !name.includes('CssMini') && !name.includes('TerserPlugin');
          }
        );
      }
    }
    return config;
  },
  jest: (config) => {
    return config;
  },
  devServer: (configFunction) => {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);
      return config;
    };
  },
};
