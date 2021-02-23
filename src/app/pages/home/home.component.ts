import { Component, OnInit, Input , Inject , PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { isPlatformBrowser} from '@angular/common';

import { RecipesService } from '../../services/recipe.service'
import { ConnectedService } from '../../services/connected.service'
import { Recipe } from '../../models/recipe.model';





@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: [],

})
export class HomeComponent implements OnInit {

  constructor(private RecipesService: RecipesService, private route: ActivatedRoute, private ConnectedService: ConnectedService ,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  @Input() isLoggedIn;
  recipes:Recipe[] = [];
  atHome = true;
  countRecipe;
  subscription : Subscription;
  savedRecipeId;

  async ngOnInit() {

    this.RecipesService.loadRecipes('');
    this.subscription = this.RecipesService.recipes$.subscribe((recipes) => {
      this.recipes = [...recipes];
    });

    if (isPlatformBrowser(this.platformId)){
      this.savedRecipeId = history.state.saveRecipeId;  // when recipe is saved , savedRecipeId is sent from recipe-edit cmp;
    }

  }

  ngAfterViewInit(){
    this.countRecipe = this.isLoggedIn? 8 : 9;
  }

  onRemoveRecipe(recipeId) {
    this.ConnectedService.recipeIdToRemve(recipeId);
  }

  changeCountRecipe(){
    this.countRecipe+=6
  }

   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
