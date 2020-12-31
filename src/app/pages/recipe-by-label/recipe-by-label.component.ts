import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router , RouterEvent, NavigationEnd } from '@angular/router';
import {ConnectedService} from '../../services/connected.service'
import { RecipesService } from '../../services/recipe.service'
import { Subscription ,Subject } from 'rxjs';
import {  filter, takeUntil } from 'rxjs/operators';
import { threadId } from 'worker_threads';
import { async } from '@angular/core/testing';

@Component({
  selector: 'recipe-by-label',
  templateUrl: './recipe-by-label.component.html',
  styleUrls: [],
})
export class RecipeByLabelComponent implements OnInit {
 

  @Input() isLoggedIn;
  isRecipeRemoved;
  recipesByLabel;
  atRecipeByTitlePage = true;
  navigateFromSearchInput;
  subscription : Subscription;

  public destroyed = new Subject<any>();

  

  constructor(private route: ActivatedRoute, private RecipesService: RecipesService,private router: Router ,
    private ConnectedService: ConnectedService) 
      {}     

  ngOnInit(): void {
    
    this.loadRecipesByLabel();

    /// for the same route(same label), is refreshing the page
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)).subscribe(() => {
        this.loadRecipesByLabel()
      });

    
  }

  loadRecipesByLabel(){
    
    window.scroll(0, 0);

    // link labels 
    const label = this.route.snapshot.params.label;
   
    // search text input
    const search = this.route.snapshot.params.search;

    /// indicates if the label comes from the search input
    this.navigateFromSearchInput = search;

    // on load cmp
    this.RecipesService.loadRecipes(label);


    /// when recipe is removed , the recipes list is updated and filterd accordingly to the label
    this.subscription = this.RecipesService.recipes$.subscribe((recipes) => {
      
      this.recipesByLabel = {
        recipes: recipes.filter(recipe => {
          if (recipe.title.includes(label) ||  recipe.labels.some(labelInLabels => labelInLabels === label)) return recipe;
        }),
        label
      } 

    });
  }



  async onRemoveRecipe(recipeId) {
    this.ConnectedService.recipeIdToRemve(recipeId); 
   
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyed.next();
    this.destroyed.complete();
  }

}
