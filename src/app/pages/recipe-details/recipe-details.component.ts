import { Component, OnInit, ChangeDetectionStrategy, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectedService } from '../../services/connected.service';
import { Subscription } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';

import { RecipesService } from '../../services/recipe.service';






@Component({
  selector: 'recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class RecipeDetailsComponent implements OnInit {

  @ViewChildren('countStep') countSteps;
  recipe;
  labels;
  isRecipeSaved;
  subscription : Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private RecipesService: RecipesService , 
    private ConnectedService:ConnectedService, private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    
    // getes the recipe from the recipe-resolver-service
    this.route.data.subscribe(data => this.recipe = data.recipe);


    // when a comment needs to be saved, recipe-details cmp getes a msg from comment-preview/recipe-comment cmp
    this.subscription = this.ConnectedService.newComment$.subscribe(async (commentDetails) => { 
       if (!commentDetails.newComment) return;
       try{
         await this.RecipesService.saveComment(commentDetails, this.recipe);
         this.ConnectedService.onSavedComment(commentDetails.replyedCommentId) // send msg to comment-recipe cmp after commet is save.
         commentDetails.newComment = null;
         commentDetails.replyedCommentId = '';
       } catch(err) {
         console.log('recipe-details cmp: cannot save comment');
       }
    });

    //title 
    this.titleService.setTitle(`${this.recipe.title} | צביה מבשלת`);
    /// meta tags
    this.metaService.addTags([
      {name: 'description', content: this.recipe.desc},
      {property: 'og:site_name', content: 'צביה מבשלת | מתכונים מבית אמא'},
      {property: 'og:type', content: 'website'},
      {property: 'og:url', content: `http://www.zviacooking.co.il/recipe/${this.recipe._id}`},
      {property: 'og:title', content: `${this.recipe.title} | צביה מבשלת`},
      {property: 'og:description', content: this.recipe.desc},
      {property: 'og:image', content: this.getImgUrl('recipeDetails1')}
    ]);

  }


  ngAfterViewInit() {

    /// on load, the first stage of the recipe prepration is marked
    setTimeout(() => {
      this.countSteps.forEach((step, idx) => {
        if (idx === 0) step.nativeElement.classList.add('markedStep');
      });
    }, 0);

    

  }


  /// when clicking on a stage of the preptation recipe , the stage is marked and the other are not.
  toggleMarkedStep(prepStepNum) {
    
    this.countSteps.map(step => {
      const elStep = step.nativeElement;
      const stepNum = elStep.querySelector('.countStep').innerText;
      if (stepNum === prepStepNum.toString()) {
        elStep.classList.add('markedStep');
      } else elStep.classList.remove('markedStep')
    });
  }


  getImgUrl(imgName){

    var imgUrl;
    this.recipe.imgUrls.forEach(img => {if (img.imgName === imgName) imgUrl = img.imgUrl})
    return imgUrl;
    
  }
  
  getSharingLink(whatsAppLink){
    return `${whatsAppLink}https://www.zviacooking.co.il/recipe/${this.recipe._id}`
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
