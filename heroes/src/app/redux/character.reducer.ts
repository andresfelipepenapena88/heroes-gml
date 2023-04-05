import { createReducer, on } from '@ngrx/store';
import * as fromHomeActions from './character.actions';
import { Character, CharacterDetail } from 'src/app/model/character.model';

export interface HomeState {
    getCharacters: {
        loading: boolean;
        loaded: boolean;
        failed: boolean;
        filter?: string;
        characters: Character[];
    };
    characterDetail: {
        loading: boolean;
        loaded: boolean;
        failed: boolean;
        character?: CharacterDetail;
    }
}

export const initHomeState: HomeState = {
    getCharacters: {
        loading: false,
        loaded:  false,
        failed: false,
        characters: []
    },
    characterDetail: {
        loading: false,
        loaded: false,
        failed: false,
    }
}

export const homeReducer = createReducer(
    initHomeState,
    on(
        fromHomeActions.getAllCharacters,
        state => {
            return {
                ...state, 
                getCharacters: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    characters: []
                }
            }
        }
    ),
    on(
        fromHomeActions.getCharactersSuccess,
        (state, payload) => {
            return {
                ...state,    
                getCharacters: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    characters: payload.characters
                }
            }
        }
    ),
    on(
        fromHomeActions.getCharactersFailed,
        state => {
            return {
                ...state,    
                getCharacters: {
                    loading: false,
                    loaded: false,
                    failed: true,
                    characters: []
                }
            }
        }
    ),
    on(
        fromHomeActions.searchCharacter,
        (state, payload) => {
            return {
                ...state,    
                getCharacters: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    filter: payload.filter,
                    characters: state.getCharacters.characters
                }
            }
        }
    ),
    on(
        fromHomeActions.searchCharacterSuccess,
        (state, payload) => {
            return {
                ...state,    
                getCharacters: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    filter: state.getCharacters.filter,
                    characters: payload.characters
                }
            }
        }
    ),
    on(
        fromHomeActions.characterDetail,
        state => {
            return {
                ...state,    
                characterDetail: {
                    loading: true,
                    loaded: false,
                    failed: false
                }
            }
        }
    ),
    on(
        fromHomeActions.characterDetailSuccess,
        (state, payload) => {
            return {
                ...state,    
                characterDetail: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    character: payload.characterDetail
                }
            }
        }
    ),
    on(
        fromHomeActions.characterDetailFailed,
        state => {
            return {
                ...state,    
                characterDetail: {
                    loading: false,
                    loaded: false,
                    failed: true
                }
            }
        }
    )

);

export const homeReducerKey = 'home';