import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ConnectedService } from '../../services/connected.service';

@Component({
  selector: 'recipe-comment',
  templateUrl: './recipe-comment.component.html',
  styleUrls: []
})

export class RecipeCommentComponent implements OnInit {

  @Input() comments;
  @ViewChild('commentForm') commentForm: ElementRef;
  @ViewChild('elCommentList') elCommentLists : ElementRef



  constructor(private ConnectedService: ConnectedService) { }

  ngOnInit(): void {


    // when comment is saved
    this.ConnectedService.replyedCommentId$.subscribe((replyedCommentId) => { 
      if (!replyedCommentId) return;

      /// this function switches between specific comment from to the main form
      this.toggleReplyForm(replyedCommentId); 
   })
    
  }

  saveComment(newComment) {
    this.ConnectedService.saveComment({ newComment }) // saving comment only from the main form
  }


  toggleReplyForm(commentId){
    
    
    /// All comment forms
    const elCommentForms = this.elCommentLists.nativeElement.querySelectorAll(`.comment-form-preview`);
    /// All reply bottons
    const elBtn = this.elCommentLists.nativeElement.querySelectorAll(`.reply-btn`);
   
    var displayMainCommentMsg;


    /// show/hide replied form when click on comment
    elCommentForms.forEach(elCommentForm => {
      
      if (elCommentForm.classList.contains(`id${commentId}`) && !elCommentForm.classList.contains('add-reply')) {
        elCommentForm.classList.add('add-reply');
        displayMainCommentMsg = 'added class';  
      } else elCommentForm.classList.remove('add-reply');

    });

    /// replce commnt-reply msg text when clicking on reply
    elBtn.forEach(btn => { 
      if (btn.classList.contains(`id${commentId}`)) {
        
        if (btn.innerText === 'השב') btn.innerText = 'ביטול';
        else btn.innerText = 'השב';
        
      } else {
        btn.innerText = 'השב'
       
      };
       
    })
    // show/hide main comment form when clicking on reply
    this.togggelMainCommentForm((displayMainCommentMsg));
  }


  togggelMainCommentForm(displayMainCommentMsg) {

    const elForm = this.commentForm.nativeElement;
    if (!displayMainCommentMsg) elForm.style.display = 'block'; // if no replied comment form is shown , show the main comment form
    else elForm.style.display = 'none';

  }


}
