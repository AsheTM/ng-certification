import { coreModuleConfigurationRoot, sharedModuleConfigurationRoot } from './environment.common';
import { EnvironmentType } from './environment.type';


export const environment: EnvironmentType = {
  production: true,
  configuration: {
    core:   coreModuleConfigurationRoot, 
    shared: sharedModuleConfigurationRoot
  }
};
