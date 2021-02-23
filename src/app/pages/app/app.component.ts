import { Component , OnInit , Inject , PLATFORM_ID} from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser} from '@angular/common';


import { RecipesService } from '../../services/recipe.service';
import { UserService } from '../../services/user.service'
import { ConnectedService } from '../../services/connected.service'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

  
})
export class AppComponent implements OnInit {
  
  isOpenSceen;
  labels;
  atHome;
  atLogin;
  isLoggedIn; 
  savedRecipeId; 
  recipeIdToRemove;
  isRecipeRemoved;

  
  


  constructor(private RecipesService: RecipesService , private UserService: UserService , 
    private router: Router , private ConnectedService: ConnectedService , @Inject(PLATFORM_ID) private platformId: Object) { }

    

  onShowScreen(isOpenScreen) {
    this.isOpenSceen = isOpenScreen;
  }

  async ngOnInit(){
    
    this.labels = this.RecipesService.labels;
    
    /// when the user clickes on the remove recipe button , home/recipe-by-label cmp sending msg
    this.ConnectedService.recipeId$.subscribe(recipeId => {
      if (recipeId) {
        this.recipeIdToRemove = recipeId;
        this.isOpenSceen = true;
        this.isRecipeRemoved = false; // reset value
      }
    });

    // on reload , update loggedin user
    this.isLoggedIn = this.UserService.isLoggedinUser();
    
    // on login ,update loggedin user
    this.UserService.user$.subscribe(user => {
      if (user && user.username) this.isLoggedIn = true;
    });
    
  }

  async onActivate(ev) {
    
    this.atHome = ev.atHome;
    this.atLogin = ev.atLogin;

    // when the recipe saved , navigation to home page happens with savedRecipeId
    this.savedRecipeId = ev.savedRecipeId;
    
    // update the relavent components when logged in user
    ev.isLoggedIn = this.isLoggedIn;

    ev.isRecipeRemoved = this.isRecipeRemoved;
    
    /// update nav-bar cmp which route is it
    let linkVal = '';
    if (ev.atHome) linkVal = 'main';
    else if (ev.atAbout) linkVal = 'about';
    this.ConnectedService.getLinkVal(linkVal); 

    // on load , scroll page to the top
    if(isPlatformBrowser(this.platformId)) window.scroll(0, 0);

    
    
  }
  
  goToRecipeDetails(){
    // go to the saved recipe
    this.router.navigateByUrl(`/recipe/${this.savedRecipeId}`)
  }

  removeDisplayMsg(){ // on remove recipe , remove modal
    this.isOpenSceen = false;
    this.recipeIdToRemove = '';
  
  }

  async removeRecipe(){
    
    try {
      await this.RecipesService.removeRecipe(this.recipeIdToRemove);
      this.removeDisplayMsg();
      this.isRecipeRemoved = true;

    } catch(err){
      console.log('cannot remove recipe');
      
    }
   
    
    
  }
  
  
}
