import { Component, OnInit, Input , Inject , PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser} from '@angular/common';
import { ActivatedRoute, Router , RouterEvent, NavigationEnd } from '@angular/router';


import {ConnectedService} from '../../services/connected.service'
import { RecipesService } from '../../services/recipe.service'
import { Subscription ,Subject } from 'rxjs';
import {  filter, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'recipe-by-label',
  templateUrl: './recipe-by-label.component.html',
  styleUrls: [],
})
export class RecipeByLabelComponent implements OnInit {
 

  @Input() isLoggedIn;
  label;
  isRecipeRemoved;
  recipesByLabel;
  atRecipeByTitlePage = true;
  navigateFromSearchInput;
  subscription : Subscription;

  public destroyed = new Subject<any>();

  

  constructor(private route: ActivatedRoute, private RecipesService: RecipesService,private router: Router ,
    private ConnectedService: ConnectedService ,  @Inject(PLATFORM_ID) private platformId: Object) 
      {}     

  ngOnInit(): void {
    
    this.loadRecipesByLabel();

     /// the recipes list is updated and filterd accordingly to the label
    this.subscription = this.RecipesService.recipes$.subscribe((recipes) => {
      this.recipesByLabel = {
        recipes: recipes.filter(recipe => {
          if (recipe.title.includes(this.label) ||  recipe.labels.some(labelInLabels => labelInLabels === this.label)) return recipe;
        }),
        label : this.label
      } 

    });

    /// for the same route(same label), is refreshing the page
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)).subscribe(() => {
        this.loadRecipesByLabel()
      });

    
  }

  loadRecipesByLabel(){
    
    if (isPlatformBrowser(this.platformId)) window.scroll(0, 0);

    // link labels 
    const label = this.route.snapshot.params.label;
    this.label = label;
    
    // search text input
    const search = this.route.snapshot.params.search;
    
    /// indicates if the label comes from the search input
    this.navigateFromSearchInput = search;
    
    // on load cmp
    this.RecipesService.loadRecipes(label);
    
  }



  async onRemoveRecipe(recipeId) {
    this.ConnectedService.recipeIdToRemve(recipeId); 
   
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyed.next();
    this.destroyed.complete();
    this.RecipesService.clearRecipes(); // when cmp destroyed the recipes list
    // need to be empty list when navigate to home page cmp
  }

}
