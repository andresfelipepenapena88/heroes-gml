import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Md5 } from 'ts-md5';
import { Constants } from '../utils/constants';
import { Observable, map } from 'rxjs';
import { GetCharacterResponse, Character, CharacterDetail, CharacterDetailResponse } from '../model/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private httpClient: HttpClient) { }

  getAllCharacters(): Observable<GetCharacterResponse> {
    return this.httpClient.get(`${ environment.URL_BASE }/characters`, { params: this.getParams('') }).pipe(map(
      (fullDataResponse: any) => {
        return this.mapToCharacterModel(fullDataResponse);
      }
    ));
  }

  searchCharacter(filter: string): Observable<GetCharacterResponse> {
    return this.httpClient.get(`${ environment.URL_BASE }/characters`, { params: this.getParams(filter) }).pipe(map(
      (fullDataResponse: any) => {
        return this.mapToCharacterModel(fullDataResponse);
      }
    ));
  }

  characterDetail(id: string): Observable<CharacterDetailResponse>{
    return this.httpClient.get(`${ environment.URL_BASE }/characters/${ id }`, { params: this.getParams('') }).pipe(map(
      (fullDataResponse: any) => {
          const map: GetCharacterResponse = {
            ...this.mapToCharacterModel(fullDataResponse)
          };
          const detail: CharacterDetail = {
            character: map.data.results[0],
            description: fullDataResponse.data.results[0].description,
            comics: fullDataResponse.data.results[0].comics.available,
            events: fullDataResponse.data.results[0].events.available,
            series: fullDataResponse.data.results[0].series.available,
            stories: fullDataResponse.data.results[0].stories.available
          };
          return {
            code: map.code,
            data: {
              results: detail
            }
          };
      }
    ));
  }

  private mapToCharacterModel(fullDataResponse: any): GetCharacterResponse {
    return {
      code: fullDataResponse.code,
      data: {
        results: fullDataResponse.data.results.map((fullCharacterData: any) => {
          const character: Character = {
            id: fullCharacterData.id,
            name: fullCharacterData.name,
            thumbnail: fullCharacterData.thumbnail.path + '.' + fullCharacterData.thumbnail.extension
          };
          return character;
        })
      }
    };
  }

  private getHash(): string {
    return Md5.hashStr(`${ environment.ts }${ environment.private_key }${ environment.api_key }`);
  }

  private getParams(withFilter: string): HttpParams {
    let allParams = {
      [Constants.TS_PARAM_NAME]: environment.ts,
      [Constants.APY_KEY_PARAM_NAME]: environment.api_key,
      [Constants.HASH_PARAM_NAME]: this.getHash()
    };
    const params = new HttpParams().appendAll(allParams);
    if (withFilter != null && withFilter != '') {
      return params.append(Constants.QUERY_PARAM_NAME, withFilter);
    } 
    return params;
  }

}
