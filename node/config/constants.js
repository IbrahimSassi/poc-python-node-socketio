const devConfig = {
  MONGO_URL : 'mongodb://localhost/backendRestApi'
};

const testConfig = {
  MONGO_URL : 'mongodb://localhost/backendRestApi'
};

const prodConfig = {
    MONGO_URL : 'mongodb://localhost/backendRestApi'
  }
;

const defaultConfig = {
  PORT : process.env.PORT || 4000
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig
    case 'test':
      return testConfig
    default:
      return defaultConfig;
  }
}


export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV)
};