export interface Character {
    id: number;
    name: string;
    thumbnail: string
}

export interface CharacterDetail {
    character: Character;
    description: string;
    comics: number;
    events: number;
    series: number;
    stories: number;
}

export interface GetCharacterResponse {
    code: number;
    data: {
        results: Character[]
    }
}

export interface CharacterDetailResponse {
    code: number;
    data: {
        results: CharacterDetail
    }
}