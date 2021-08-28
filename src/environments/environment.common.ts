import { TNestedPartial } from 'src/app/shared';

import { EnvironmentConfigurationCore, EnvironmentConfigurationShared } from './environment.type';


export const coreModuleConfigurationRoot: EnvironmentConfigurationCore = {
  baseHref: '/'
};

export const sharedModuleConfiguration: TNestedPartial<EnvironmentConfigurationShared> = {
  root:     {
    api:          {
      params: {
        limit:  'limit'
      }
    }, 
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
        params:   {
          zipcode:  'zip'
        }, 
        apiKey:   '5a4b2d457ecbef9eb2a71e480b947604'
      }
    }, 
    zipcode:  {
      http:         {
        params:   {
          zipcode:  'zip'
        }, 
        apiKey:   '5a4b2d457ecbef9eb2a71e480b947604', 
        interval: 30000
      },
      fallback:     {
        url:      'https://lp-store.herokuapp.com/weather', 
        params:   {
          zipcode:  'zipcode'
        }
      }
    }
  }
};
