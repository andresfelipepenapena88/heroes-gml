import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromHomeReducer from '../../redux/character.reducer';
import * as fromHomeActions from '../../redux/character.actions';
import * as fromHomeSelectors from '../../redux/character.selectors';
import { CharacterDetail } from 'src/app/model/character.model';

@Component({
  selector: 'app-heroe-detail',
  templateUrl: './heroe-detail.component.html',
  styleUrls: ['./heroe-detail.component.scss']
})
export class HeroeDetailComponent implements OnInit {

  characterDetail: CharacterDetail = {
    character: {
      id: 0,
      name: '',
      thumbnail: ''
    },
    description: '',
    comics: 0,
    events: 0,
    series: 0,
    stories: 0,
  };

  loading: boolean = false;

  constructor(
    private routerActive: ActivatedRoute,
    private router: Router,
    private heroeDetailStore: Store<fromHomeReducer.HomeState>
  ) {}

  ngOnInit(): void {
    const idParam = this.routerActive.snapshot.paramMap.get('id');
    if (idParam) {
      this.heroeDetailStore.dispatch(fromHomeActions.characterDetail({ id: idParam }));
      this.heroeDetailStore.select(fromHomeSelectors.selectCharacterDetail).subscribe(response => {
        this.loading = response.loading;
        if (response.loaded && (response.character != undefined && response.character != null)) {
          this.characterDetail = response.character;
        }
      })
    }
  }

  goBack() {
    this.router.navigate(['characters']);
  }

}
