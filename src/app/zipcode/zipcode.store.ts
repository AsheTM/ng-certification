import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';

import { EZipcodeState } from './zipcode.enum';
import { TWeather } from './zipcode.type';

import { AppState } from '../app.store';


export type RootState = AppState.Type & {
  [Selector.SLICE_STATE]: State.Type
};


export namespace Selector {
  export const SLICE_STATE      = 'zipcode';
  const getFeatureSliceStore    = createFeatureSelector<State.Type>(SLICE_STATE);

  export const getLoadingState  = createSelector(getFeatureSliceStore, ({ loadingState }: State.Type):  EZipcodeState => loadingState);
  export const getWeathers      = createSelector(getFeatureSliceStore, ({ weathers }: State.Type):      TWeather[]    => weathers);
}


export namespace State {
  export const INITIAL: Type = {
    loadingState: EZipcodeState.DEFAULT, 
    weathers:     []
  };

  export type Type = {
    loadingState: EZipcodeState, 
    weathers:     TWeather[]
  };
}


export namespace Action {
  export const getData        = createAction('[Zipcode] (Effect) Get Zipcodes', 
    props<Record<'data', [string, string][]>>());
  export const weathersLoaded = createAction('[Zipcode] Init Weathers Data Done', 
    props<Record<'weathers', TWeather[]>>());

  export const loadedState    = createAction('[Zipcode] Loaded State');
  export const loadingState   = createAction('[Zipcode] (Effect) Loading State', 
    props<Record<'location' | 'zipcode', string>>());
  export const doneState      = createAction('[Zipcode] (Effect) Done State');
}


export namespace Reducer {
  export const reducer = createReducer(
    State.INITIAL,
    on(Action.weathersLoaded,
      (state: State.Type, { weathers }: Record<'weathers', TWeather[]>) =>
        ({ ...state, weathers })),

    on(Action.loadedState,
      (state: State.Type) =>
        ({ ...state, loadingState: EZipcodeState.DEFAULT })),
    on(Action.loadingState,
      (state: State.Type) =>
        ({ ...state, loadingState: EZipcodeState.WORKING })),
    on(Action.doneState,
      (state: State.Type) =>
        ({ ...state, loadingState: EZipcodeState.DONE }))
  );
}
