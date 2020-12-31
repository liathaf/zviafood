import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import {catchError } from 'rxjs/operators';
import { of } from 'rxjs';


import { RecipesService } from './recipe.service';



@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<any> {

  constructor(private RecipesService: RecipesService , private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) {


    return this.RecipesService.getRecipeById(route.paramMap.get('id'))
      .pipe(catchError(err => {
        this.router.navigateByUrl('')
        return of(null)
      }))

  }
}
