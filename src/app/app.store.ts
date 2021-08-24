import { createReducer } from '@ngrx/store';


export namespace AppState {
  export const INITIAL: Type = { };

  export type Type = { };
}


export namespace AppAction { }


export namespace AppReducer {
  export const reducer = createReducer(AppState.INITIAL);
}
