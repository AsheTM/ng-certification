import { InjectionToken } from "@angular/core";


namespace Token {
    export const HTTP:          InjectionToken<string>  = new InjectionToken<string>('SHARED_TOKEN_VALUE_HTTP');
    export const FALLBACK:      InjectionToken<string>  = new InjectionToken<string>('SHARED_TOKEN_VALUE_FALLBACK');
    export const INTERCEPTOR:   InjectionToken<string>  = new InjectionToken<string>('SHARED_TOKEN_VALUE_INTERCEPTOR');
    export const STORAGE:       InjectionToken<string>  = new InjectionToken<string>('SHARED_TOKEN_VALUE_STORAGE');
}

export const SHARED_TOKEN_VALUE_HTTP:           InjectionToken<string>  = Token.HTTP;
export const SHARED_TOKEN_VALUE_FALLBACK:       InjectionToken<string>  = Token.FALLBACK;
export const SHARED_TOKEN_VALUE_INTERCEPTOR:    InjectionToken<string>  = Token.INTERCEPTOR;
export const SHARED_TOKEN_VALUE_STORAGE:        InjectionToken<string>  = Token.STORAGE;
