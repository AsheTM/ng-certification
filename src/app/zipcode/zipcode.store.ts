import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';

import { TWeather } from './zipcode.type';

import { AppState } from '../app.store';

import { ELoadingState } from '../shared';


export type RootState = AppState.Type & {
  [Selector.SLICE_STATE]: State.Type
};


export namespace Selector {
  export const SLICE_STATE      = 'zipcode';
  const getFeatureSliceStore    = createFeatureSelector<State.Type>(SLICE_STATE);

  export const isLoadingState 
    = createSelector(
      getFeatureSliceStore, 
      ({ loadingState }: State.Type):  ELoadingState  => loadingState
    );
  export const isDoneLoadingState 
    = createSelector(
      getFeatureSliceStore, 
      ({ loadingState }: State.Type):  boolean        => loadingState === ELoadingState.DONE
    );
  export const isWorkingLoadingState 
    = createSelector(
      getFeatureSliceStore, 
      ({ loadingState }: State.Type):  boolean        => loadingState === ELoadingState.WORKING
    );
  export const getWeathers 
    = createSelector(
      getFeatureSliceStore, 
      ({ weathers }: State.Type):      TWeather[]     => weathers
    );
}


export namespace State {
  export const INITIAL: Type = {
    loadingState: ELoadingState.DEFAULT, 
    weathers:     []
  };

  export type Type = {
    loadingState: ELoadingState, 
    weathers:     TWeather[]
  };
}


export namespace Action {
  export const getData        = createAction('[Zipcode] (Effect) Get Zipcodes & Locations', 
    props<Record<'data', Record<string, string>>>());
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
        ({ ...state, loadingState: ELoadingState.DEFAULT })),
    on(Action.loadingState,
      (state: State.Type) =>
        ({ ...state, loadingState: ELoadingState.WORKING })),
    on(Action.doneState,
      (state: State.Type) =>
        ({ ...state, loadingState: ELoadingState.DONE }))
  );
}
