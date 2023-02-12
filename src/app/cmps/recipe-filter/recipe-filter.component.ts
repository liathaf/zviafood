import { Component, Input, Output , EventEmitter , ViewChild ,ElementRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'recipe-filter',
  templateUrl: './recipe-filter.component.html',
  styleUrls: [],
 
})
export class RecipeFilterComponent {

  @Input() labels;
  @Output() onSearchRecipe = new EventEmitter();
  @Output() onClickedLabel = new EventEmitter();
  @ViewChild('elLabels') elLabels: ElementRef;


  filterBy;
 



  constructor(private router: Router ) {}

  ngOnInit(){}

  onEnter(){
    if (!this.filterBy) return;
    this.onSearchRecipe.emit(); // for narrow tablet and mobile , hide nav-bar links
    this.router.navigate([`recipe/label/${this.filterBy}` , {search: true}]);
    this.filterBy = '';

  }


  goToRecipeByLabels(label){
    
    // when clicking on label
    this.elLabels.nativeElement.style.pointerEvents = 'none'; // hide drop-down labels by removing the hover effect
    setTimeout(() => {
      this.elLabels.nativeElement.style.pointerEvents = 'unset'; // wait for 1sec and return the hover effect 
    }, 1000);
    this.onClickedLabel.emit(); // for mobile , hide nav-bar links
    this.router.navigateByUrl(`recipe/label/${label}`);
  }



}
