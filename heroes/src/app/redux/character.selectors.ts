import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromHomeReducer from "./character.reducer";

export const selectHomeState = createFeatureSelector<fromHomeReducer.HomeState>(fromHomeReducer.homeReducerKey);

export const selectHomeCharacters = createSelector(
    selectHomeState,
    (state: fromHomeReducer.HomeState) => state.getCharacters
);

export const selectCharacterDetail = createSelector(
    selectHomeState,
    (state: fromHomeReducer.HomeState) => state.characterDetail
);