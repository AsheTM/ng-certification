import { EnvironmentConfigurationCore, EnvironmentConfigurationShared } from './environment.type';


export const coreModuleConfigurationRoot: EnvironmentConfigurationCore = {
  baseHref: '/'
};

export const sharedModuleConfiguration: EnvironmentConfigurationShared = {
  root:     {
    interceptor:  {
      param:  'x-intercept'
    }, 
    storage:      {
      name:   'zipcodes'
    }
  }, 
  feature:  {
    forecast: {
      http:         {
        url:      'https://api.openweathermap.org/data/2.5/forecast',
        params:   {
          location: 'q', 
          zipcode:  'zip'
        }, 
        apiKey:   '5a4b2d457ecbef9eb2a71e480b947604'
      }
    }, 
    zipcode:  {
      http:         {
        url:      'https://api.openweathermap.org/data/2.5/weather', 
        params:   {
          location: 'q', 
          zipcode:  'zip'
        }, 
        apiKey:   '5a4b2d457ecbef9eb2a71e480b947604', 
        interval: 30000
      },
      fallback:     {
        url:      'https://lp-store.herokuapp.com/weather', 
        params:   {
          location: 'q', 
          zipcode:  'zipcode'
        }
      }
    }
  }
};
