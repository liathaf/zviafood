import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectedService {

  constructor() { }


  /// when user want to remove recipe
  private recipeId = new BehaviorSubject('');
  recipeId$ = this.recipeId.asObservable();
  
  recipeIdToRemve(recipeId) { 
    this.recipeId.next(recipeId);
  }

   /// update the current route for nav-bar cmp
  private linkVal = new BehaviorSubject('');
  linkVal$ = this.linkVal.asObservable();
  
  getLinkVal(linkVal){
    this.linkVal.next(linkVal);
  }


   /// when need to save comment
  private newComment = new BehaviorSubject({newComment: null ,replyedCommentId: ''});
  newComment$ = this.newComment.asObservable();
  
  saveComment(newComment){
    this.newComment.next(newComment);
  }


   /// when comment is saved
  private replyedCommentId = new BehaviorSubject('');
  replyedCommentId$ = this.replyedCommentId.asObservable();
  
  onSavedComment(replyedCommentId: string){
    this.replyedCommentId.next(replyedCommentId);
  }

}


