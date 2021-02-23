import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrls: []
})
export class RecipePreviewComponent implements OnInit {

  @Input() recipe;
  @Input() atRecipeByTitlePage;
  @Input() isLoggedIn;
  @Output() onRemoveRecipe = new EventEmitter;
  @Output() onToggleRecipeEdit = new EventEmitter;

  constructor(private router:Router) { }

  ngOnInit(): void {
   
    
  }

  getImgUrl(imgName){
 
    var imgUrl;
    this.recipe.imgUrls.forEach(img => {if (img.imgName === imgName) imgUrl = img.imgUrl})
    return imgUrl;
    
  }


}
