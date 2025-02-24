import { CoreModuleConfigurationType } from 'src/app/core';
import {
  TSharedModuleConfigurationHttp, 
  TSharedModuleConfigurationFallback, 
  TSharedModuleConfigurationStorage,
  TSharedModuleConfigurationInterceptor,
  TSharedModuleConfigurationApi
} from 'src/app/shared';

import { EEnvironmentFeature } from './environment.enum';


export type EnvironmentType                           = {
  production:     boolean;
  configuration:  EnvironmentConfigurationType;
};

export type EnvironmentConfigurationType              = {
  shared:   EnvironmentConfigurationShared;
  core:     EnvironmentConfigurationCore;
};

export type EnvironmentConfigurationCore              = CoreModuleConfigurationType;

export type EnvironmentConfigurationShared            = {
  root:     EnvironmentConfigurationSharedRoot;
  feature:  EnvironmentConfigurationSharedFeatures;
};

export type EnvironmentConfigurationSharedRoot        = EnvironmentConfigurationSharedApi
  & EnvironmentConfigurationSharedInterceptor 
  & EnvironmentConfigurationSharedStorage;

export type EnvironmentConfigurationSharedFeatures    = Record<EEnvironmentFeature, EnvironmentConfigurationSharedFeature>;
export type EnvironmentConfigurationSharedFeature     = EnvironmentConfigurationSharedHttp 
  & Partial<EnvironmentConfigurationSharedFallback>;

export type EnvironmentConfigurationSharedApi         = Record<'api', TSharedModuleConfigurationApi>;
export type EnvironmentConfigurationSharedFallback    = Record<'fallback', TSharedModuleConfigurationFallback>;
export type EnvironmentConfigurationSharedHttp        = Record<'http', TSharedModuleConfigurationHttp>;
export type EnvironmentConfigurationSharedInterceptor = Record<'interceptor', TSharedModuleConfigurationInterceptor>;
export type EnvironmentConfigurationSharedStorage     = Record<'storage', TSharedModuleConfigurationStorage>;
