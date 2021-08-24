
export type TSharedModuleConfiguration              = {
    http:           TSharedModuleConfigurationHttp;
    fallback:       TSharedModuleConfigurationFallback;
    interceptor:    TSharedModuleConfigurationInterceptor;
    storage:        TSharedModuleConfigurationStorage;
};

export type TSharedModuleConfigurationHttp          = {
    url:        string;
    params:     Record<'location' | 'zipcode', string>;
    apiKey:     string;
    interval?:  number;
};

export type TSharedModuleConfigurationFallback      = {
    url:        string;
    params:     Partial<Record<'location' | 'zipcode', string>>;
};

export type TSharedModuleConfigurationInterceptor   = {
    param:  string;
};

export type TSharedModuleConfigurationStorage       = {
    name:   string;
};
