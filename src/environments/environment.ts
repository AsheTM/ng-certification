// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { coreModuleConfigurationRoot, sharedModuleConfiguration } from './environment.common';
import {
  EnvironmentConfigurationSharedFeature, 
  EnvironmentConfigurationSharedFeatures, 
  EnvironmentConfigurationSharedRoot, 
  EnvironmentType
} from './environment.type';

import { TSharedModuleConfigurationApi, TSharedModuleConfigurationHttp } from 'src/app/shared';


export const environment: EnvironmentType = {
  production:     false,
  configuration:  {
    core:   coreModuleConfigurationRoot, 
    shared: {
      root: {
        ...sharedModuleConfiguration?.root as EnvironmentConfigurationSharedRoot, 
        api:  {
          ...sharedModuleConfiguration?.root?.api as TSharedModuleConfigurationApi, 
          url:    '/countries'
        }
      }, 
      feature:  {
        ...sharedModuleConfiguration?.feature as EnvironmentConfigurationSharedFeatures, 
        forecast: {
          ...sharedModuleConfiguration?.feature?.forecast as EnvironmentConfigurationSharedFeature, 
          http: {
            ...sharedModuleConfiguration?.feature?.forecast?.http as TSharedModuleConfigurationHttp, 
            url:  '/api/forecast'
          }
        }, 
        zipcode:  {
          ...sharedModuleConfiguration?.feature?.forecast as EnvironmentConfigurationSharedFeature, 
          http: {
            ...sharedModuleConfiguration?.feature?.forecast?.http as TSharedModuleConfigurationHttp, 
            url:  '/api/weather'
          }
        }
      }
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
