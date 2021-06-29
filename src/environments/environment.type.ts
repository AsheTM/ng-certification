import { CoreModuleConfigurationType } from 'src/app/core';
import {
  TSharedModuleConfigurationHttp, 
  TSharedModuleConfigurationFallback, 
  TSharedModuleConfigurationStorage,
  TSharedModuleConfigurationInterceptor
} from 'src/app/shared';


export type EnvironmentType                           = {
  production:     boolean;
  configuration:  EnvironmentConfigurationType;
};

export type EnvironmentConfigurationType              = {
  shared:   EnvironmentConfigurationShared;
  core:     CoreModuleConfigurationType;
};

export type EnvironmentConfigurationCore              = CoreModuleConfigurationType;

export type EnvironmentConfigurationSharedFallback    = Record<'fallback', Partial<Omit<TSharedModuleConfigurationFallback, 'url'> & Record<'urls', any>>>;

export type EnvironmentConfigurationSharedHttp        = Record<'http', Partial<Omit<TSharedModuleConfigurationHttp, 'url'> & Record<'urls', any>>>;

export type EnvironmentConfigurationSharedInterceptor = Record<'interceptor', TSharedModuleConfigurationInterceptor>;

export type EnvironmentConfigurationSharedStorage     = Record<'storage', TSharedModuleConfigurationStorage>;

export type EnvironmentConfigurationShared            = EnvironmentConfigurationSharedStorage 
  & EnvironmentConfigurationSharedInterceptor 
  & EnvironmentConfigurationSharedHttp 
  & EnvironmentConfigurationSharedFallback;
