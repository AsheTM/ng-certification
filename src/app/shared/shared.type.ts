
export type TSharedModuleConfiguration              = {
    http:           TSharedModuleConfigurationHttp;
    fallback:       TSharedModuleConfigurationFallback;
    interceptor:    TSharedModuleConfigurationInterceptor;
    storage:        TSharedModuleConfigurationStorage;
};

export type TSharedModuleConfigurationHttp          = {
    url:        string;
    param:      string;
    apiKey:     string;
    interval?:  number;
};

export type TSharedModuleConfigurationFallback      = {
    url:        string;
    param:      string;
    static?:    string[];
};

export type TSharedModuleConfigurationInterceptor   = {
    param:  string;
};

export type TSharedModuleConfigurationStorage       = {
    name:   string;
};
