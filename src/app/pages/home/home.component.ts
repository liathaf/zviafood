import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { RecipesService } from '../../services/recipe.service'
import { ConnectedService } from '../../services/connected.service'
import { Recipe } from '../../models/recipe.model';




@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: [],

})
export class HomeComponent implements OnInit {

  constructor(private RecipesService: RecipesService, private route: ActivatedRoute, private ConnectedService: ConnectedService) { }

  @Input() isLoggedIn;
  recipes:Recipe[] = [];
  atHome = true;
  savedRecipeId = history.state.saveRecipeId;  // when recipe is saved , savedRecipeId is sent from recipe-edit cmp;
  countRecipe = 15;
  subscription : Subscription;

  async ngOnInit() {

    this.RecipesService.loadRecipes('');
    this.subscription = this.RecipesService.recipes$.subscribe((recipes) => {
      this.recipes = [...recipes];
    });

  }

  onRemoveRecipe(recipeId) {
    this.ConnectedService.recipeIdToRemve(recipeId);
  }

  changeCountRecipe(){
    this.countRecipe+=15
  }

   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
