import { Component, OnInit } from '@angular/core';
// Redux
import { Store } from '@ngrx/store';
import * as fromCharacterActions from '../../redux/character.actions';
import * as fromCharacterSelectors from '../../redux/character.selectors';
import * as fromCharacterReducer from '../../redux/character.reducer';
import { Character } from 'src/app/model/character.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  characters: Character[] = [];
  filterText = new FormControl('');
  loading: boolean = false;

  constructor(
    private characterStore: Store<fromCharacterReducer.HomeState>
  ) {}

  ngOnInit(): void {
    const filter = localStorage.getItem('characterFilter');
    if (filter != null) {
      this.filterText.setValue(filter);
      this.searchCharacter();
    } else {
      this.characterStore.dispatch(fromCharacterActions.getAllCharacters());
    }
    this.characterStore.select(fromCharacterSelectors.selectHomeCharacters).subscribe((response) => {
      this.loading = response.loading;
      if (response.loaded) {
        this.characters = response.characters;
        if (response.filter) {
          localStorage.setItem('characterFilter', response.filter);
        }
      }
    });
  }

  searchCharacter() {
    if (this.filterText.value != null) {
      this.characterStore.dispatch(fromCharacterActions.searchCharacter({ filter: this.filterText.value }));
    }
  }

}
