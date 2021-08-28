
export type TSharedModuleConfiguration              = {
    api:            TSharedModuleConfigurationApi;
    http:           TSharedModuleConfigurationHttp;
    fallback:       TSharedModuleConfigurationFallback;
    interceptor:    TSharedModuleConfigurationInterceptor;
    storage:        TSharedModuleConfigurationStorage;
};

export type TSharedModuleConfigurationApi           = {
    url:    string;
    params: Record<'limit', string>;
};

export type TSharedModuleConfigurationHttp          = {
    url:        string;
    params:     Record<'zipcode', string>;
    apiKey:     string;
    interval?:  number;
};

export type TSharedModuleConfigurationFallback      = {
    url:        string;
    params:     Partial<Record<'zipcode', string>>;
};

export type TSharedModuleConfigurationInterceptor   = {
    param:  string;
};

export type TSharedModuleConfigurationStorage       = {
    name:   string;
};
