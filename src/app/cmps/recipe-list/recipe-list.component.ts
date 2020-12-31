import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: [],
  
})
export class RecipeListComponent {

  @Input() recipes;
  @Input() atRecipeByTitlePage;
  @Input() isLoggedIn;
  @Input() countRecipe;
  @Output() removeRecipe = new EventEmitter;

 
  
  ngOnInit() {
   
  }



  



}
