import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ConnectedService} from '../../services/connected.service'

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: [],

})
export class ModalComponent implements OnInit {

  constructor(private ConnectedService: ConnectedService) { }

  @Input() savedRecipeId;
  @Input() recipeIdToRemove;
  @Input() isRecipeRemoved;
  @Output() onGoToRecipeDetails = new EventEmitter;
  @Output() onRemoveDisplayMsg = new EventEmitter;
  @Output() onRemoveRecipe = new EventEmitter;
  @Output() onRemoveSaveRecipeModal = new EventEmitter;
 

  ngOnInit(): void {

  }

  removeDisplayMsg(){
    this.onRemoveDisplayMsg.emit()
    
  }

  removeRecipe(){
    this.onRemoveRecipe.emit();

  }

}
