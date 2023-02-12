import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';
import { RecipeByLabelComponent } from './pages/recipe-by-label/recipe-by-label.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { RecipeEditComponent } from './pages/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './services/recipe.resolver.service';
import {LoginGuard} from './guards/login.guard';
import {LessonsComponent} from './pages/lessons/lessons.component';


const routes: Routes = [
  { path: 'recipe/label/:label', pathMatch: 'full', component: RecipeByLabelComponent },
  { path: 'recipe/edit/:id', pathMatch: 'full',  resolve: { recipe: RecipeResolverService } , component: RecipeEditComponent },
  { path: 'recipe/edit', pathMatch: 'full', component: RecipeEditComponent },
  { path: 'recipe/:id', pathMatch: 'full', resolve: { recipe: RecipeResolverService }, component: RecipeDetailsComponent },
  { path: 'lessons', pathMatch: 'full', component: LessonsComponent },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  { path: 'login/zvia', pathMatch: 'full', canActivate: [LoginGuard],component: LoginComponent },
  { path: '', pathMatch: 'full', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
