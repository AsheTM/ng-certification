import { coreModuleConfigurationRoot, sharedModuleConfiguration } from './environment.common';
import { EnvironmentType } from './environment.type';


export const environment: EnvironmentType = {
  production:     true,
  configuration:  {
    core:   coreModuleConfigurationRoot, 
    shared: {
      root:     sharedModuleConfiguration.root, 
      feature:  sharedModuleConfiguration.feature
    }
  }
};
