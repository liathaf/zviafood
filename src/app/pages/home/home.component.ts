import { Component, OnInit, Input , Inject , PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { isPlatformBrowser} from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';


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
    @Inject(PLATFORM_ID) private platformId: Object , private titleService: Title, private metaService: Meta) { }

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

    //title 
    this.titleService.setTitle('צביה מבשלת | מתכונים מבית אמא');
    /// meta tags
    this.metaService.addTags([
      {name: 'description', content: 'אין כמו האוכל של אמא אשר למדה מאמא שלה וכן הלאה, צביה מביאה את מתכוני אוכל שעליהם גדלנו ונהנו מכל רגע, מתכוני האוכל ממגון עדות המזרח'},
      {property: 'og:site_name', content: 'צביה מבשלת | מתכונים מבית אמא'},
      {property: 'og:type', content: 'website'},
      {property: 'og:url', content: 'http://www.zviacooking.co.il'},
      {property: 'og:title', content: 'צביה מבשלת | מתכונים מבית אמא'},
      {property: 'og:description', content: 'אין כמו האוכל של אמא אשר למדה מאמא שלה וכן הלאה, צביה מביאה את מתכוני אוכל שעליהם גדלנו ונהנו מכל רגע, מתכוני האוכל ממגון עדות המזרח'},
      {property: 'og:image', content: 'https://res.cloudinary.com/dlzwnajfq/image/upload/v1609264917/zviacooking-og-image-200x200_ztybfd.jpg'},
      {property: 'og:image', content: 'https://res.cloudinary.com/dlzwnajfq/image/upload/v1609264918/zviacooking-og-image-1200x360_g3pyv7.jpg'}
    ]);
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
