import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeroeDetailComponent } from './pages/heroe-detail/heroe-detail.component';

const routes: Routes = [
  { path: 'characters', component: HomeComponent },
  { path: 'characters/:id', component: HeroeDetailComponent },
  { path: '**', redirectTo: 'characters', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
