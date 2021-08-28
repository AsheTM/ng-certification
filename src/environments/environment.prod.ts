import { coreModuleConfigurationRoot, sharedModuleConfiguration } from './environment.common';
import {
  EnvironmentConfigurationSharedFeature, 
  EnvironmentConfigurationSharedFeatures, 
  EnvironmentConfigurationSharedRoot, 
  EnvironmentType
} from './environment.type';

import { TSharedModuleConfigurationApi, TSharedModuleConfigurationHttp } from 'src/app/shared';


export const environment: EnvironmentType = {
  production:     true,
  configuration:  {
    core: coreModuleConfigurationRoot, 
    shared: {
      root: {
        ...sharedModuleConfiguration?.root as EnvironmentConfigurationSharedRoot, 
        api:  {
          ...sharedModuleConfiguration?.root?.api as TSharedModuleConfigurationApi, 
          url:    'https://api.first.org/data/v1/countries'
        }
      }, 
      feature:  {
        ...sharedModuleConfiguration?.feature as EnvironmentConfigurationSharedFeatures, 
        forecast: {
          ...sharedModuleConfiguration?.feature?.forecast as EnvironmentConfigurationSharedFeature, 
          http: {
            ...sharedModuleConfiguration?.feature?.forecast?.http as TSharedModuleConfigurationHttp, 
            url:  'https://api.openweathermap.org/data/2.5/forecast'
          }
        }, 
        zipcode:  {
          ...sharedModuleConfiguration?.feature?.forecast as EnvironmentConfigurationSharedFeature, 
          http: {
            ...sharedModuleConfiguration?.feature?.forecast?.http as TSharedModuleConfigurationHttp, 
            url:  'https://api.openweathermap.org/data/2.5/weather'
          }
        }
      }
    }
  }
};
