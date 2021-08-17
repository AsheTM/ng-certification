import { InjectionToken } from "@angular/core";
import { ESharedProvider } from "./shared.enum";


namespace Token {
    export const FOR_ROOT:      InjectionToken<ESharedProvider> = new InjectionToken<ESharedProvider>('SHARED_PROVIDER_FOR_ROOT');
    export const FOR_FEATURE:   InjectionToken<ESharedProvider> = new InjectionToken<ESharedProvider>('SHARED_PROVIDER_FOR_FEATURE');

    export const HTTP:          InjectionToken<string>  = new InjectionToken<string>('SHARED_TOKEN_VALUE_HTTP');
    export const FALLBACK:      InjectionToken<string>  = new InjectionToken<string>('SHARED_TOKEN_VALUE_FALLBACK');
    export const INTERCEPTOR:   InjectionToken<string>  = new InjectionToken<string>('SHARED_TOKEN_VALUE_INTERCEPTOR');
    export const STORAGE:       InjectionToken<string>  = new InjectionToken<string>('SHARED_TOKEN_VALUE_STORAGE');
}


export const SHARED_PROVIDER_FOR_ROOT:      InjectionToken<ESharedProvider> = Token.FOR_ROOT;
export const SHARED_PROVIDER_FOR_FEATURE:   InjectionToken<ESharedProvider> = Token.FOR_FEATURE;

export const SHARED_TOKEN_VALUE_HTTP:           InjectionToken<string>  = Token.HTTP;
export const SHARED_TOKEN_VALUE_FALLBACK:       InjectionToken<string>  = Token.FALLBACK;
export const SHARED_TOKEN_VALUE_INTERCEPTOR:    InjectionToken<string>  = Token.INTERCEPTOR;
export const SHARED_TOKEN_VALUE_STORAGE:        InjectionToken<string>  = Token.STORAGE;
