import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [ {
  path: '',
  redirectTo:`home`,
  pathMatch: 'full'
},
{
  path: 'home',
  component : HomeComponent ,
},
{
  path: 'home/card-detail/:id',
  component :CardDetailComponent ,
}];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
