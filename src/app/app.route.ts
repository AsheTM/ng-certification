
namespace Route {
    export const WILDCARD:      string = '**';
    export const REDIRECT_TO:   string = '/';

    export namespace Feature {
        export const ZIPCODE:   string = '';
        export const FORECAST:  string = 'forecast';
    }
}

export const APP_ROUTE_WILDCARD:            string = Route.WILDCARD;
export const APP_ROUTE_REDIRECT_TO:         string = Route.REDIRECT_TO;

export const APP_ROUTE_FEATURE_ZIPCODE:     string = Route.Feature.ZIPCODE;
export const APP_ROUTE_FEATURE_FORECAST:    string = Route.Feature.FORECAST;
