const config = {
  get: (key) => process.env[key],
};

export default config;
