import { EnvironmentConfigurationCore, EnvironmentConfigurationShared } from './environment.type';


export const coreModuleConfigurationRoot: EnvironmentConfigurationCore = {
  baseHref: '/'
};

export const sharedModuleConfigurationRoot: EnvironmentConfigurationShared = {
  http: {
    urls: {
      weather: 'https://api.openweathermap.org/data/2.5/weather', 
      forecast: 'https://api.openweathermap.org/data/2.5/forecast'
    },
    param: 'zip', 
    apiKey: '5a4b2d457ecbef9eb2a71e480b947604'
  },
  fallback: {
    urls: {
      weather: 'https://lp-store.herokuapp.com/weather', 
      forecast: ''
    }, 
    param: 'zipcode', 
    static: ['95742', '10001', '33101']
  }, 
  interceptor: {
    param: 'x-intercept'
  }, 
  storage: {
    name: 'zipcodes'
  }
};
