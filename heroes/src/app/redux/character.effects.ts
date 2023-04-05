import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromHomeActions from './character.actions';
import { switchMap, map } from 'rxjs';
import { CharacterService } from 'src/app/services/character.service';
import { CharacterDetailResponse, GetCharacterResponse } from 'src/app/model/character.model';

@Injectable()
export class HomeEffects {

    getAllCharacters$ = createEffect(() => this.actions$.pipe(
        ofType(fromHomeActions.HomeActionType.GET_ALL_CHARACTERS),
        switchMap(() => this.characterService.getAllCharacters().pipe(
            map((response: GetCharacterResponse) => {
                if(response.code == 200) {
                    return fromHomeActions.getCharactersSuccess({ characters: response.data.results });
                } else {
                    return fromHomeActions.getCharactersFailed();
                }
            })
        ))
    ));

    searchCharacter$ = createEffect(() => this.actions$.pipe(
        ofType(fromHomeActions.HomeActionType.SEARCH_CHARACTER),
        switchMap((payload: { filter: string }) => this.characterService.searchCharacter(payload.filter).pipe(
            map((response: GetCharacterResponse) => {
                if(response.code == 200) {
                    return fromHomeActions.searchCharacterSuccess({ characters: response.data.results });
                } else {
                    return fromHomeActions.searchCharacterFailed();
                }
            })
        ))
    ));

    ccharacterDetail$ = createEffect(() => this.actions$.pipe(
        ofType(fromHomeActions.HomeActionType.CHARACTER_DETAIL),
        switchMap((payload: { id: string }) => this.characterService.characterDetail(payload.id).pipe(
            map((response: CharacterDetailResponse) => {
                if(response.code == 200) {
                    return fromHomeActions.characterDetailSuccess({ characterDetail: response.data.results });
                } else {
                    return fromHomeActions.characterDetailFailed();
                }
            })
        ))
    ));

    constructor(
        private actions$: Actions,
        private characterService: CharacterService
    ) {}

}