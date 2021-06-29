
namespace Route {
    export const PARAMS:    Record<string, string>  = { id: ':id' };
    export const PARAM_ID:  string                  = 'id';

    export const ROOT:      string                  = PARAMS[PARAM_ID];
}

export const FORECAST_ROUTE_ROOT:           string = Route.ROOT;
export const FORECAST_ROUTE_ROOT_PARAM_ID:  string = Route.PARAM_ID;
