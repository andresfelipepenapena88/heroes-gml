import { createAction, props } from '@ngrx/store';
import { Character } from 'src/app/model/character.model';

export enum HomeActionType {
    GET_ALL_CHARACTERS = '[HOME] Get All Characters',
    GET_ALL_CHARACTERS_SUCCESS = '[HOME] Get All Characters Success',
    GET_ALL_CHARACTERS_FAILED = '[HOME] Get All Characters Failed',
    SEARCH_CHARACTER = '[HOME] Search Character',
    SEARCH_CHARACTER_SUCCESS = '[HOME] Search Character Success',
    SEARCH_CHARACTER_FAILED = '[HOME] Search Character Failed',
    CHARACTER_DETAIL = '[HEROE_DETAIL] Character Detail',
    CHARACTER_DETAIL_SUCCESS = '[HEROE_DETAIL] Character Detail Success',
    CHARACTER_DETAIL_FAILED = '[HEROE_DETAIL] Character Detail Failed',
}

export const getAllCharacters = createAction(
    HomeActionType.GET_ALL_CHARACTERS
);

export const getCharactersSuccess = createAction(
    HomeActionType.GET_ALL_CHARACTERS_SUCCESS,
    props<{ characters: Character[] }>()
);

export const getCharactersFailed = createAction(
    HomeActionType.GET_ALL_CHARACTERS_FAILED
);

export const searchCharacter = createAction(
    HomeActionType.SEARCH_CHARACTER,
    props<{ filter: string }>()
);

export const searchCharacterSuccess = createAction(
    HomeActionType.SEARCH_CHARACTER_SUCCESS,
    props<{ characters: Character[] }>()
);

export const searchCharacterFailed = createAction(
    HomeActionType.SEARCH_CHARACTER_FAILED
);

export const characterDetail = createAction(
    HomeActionType.CHARACTER_DETAIL,
    props<{ id: string }>()
);

export const characterDetailSuccess = createAction(
    HomeActionType.CHARACTER_DETAIL_SUCCESS,
    props<{ characterDetail: any }>()
);

export const characterDetailFailed = createAction(
    HomeActionType.CHARACTER_DETAIL_FAILED
);