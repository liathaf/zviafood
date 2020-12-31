import { Component, OnInit, Input, ViewChildren, ElementRef, Output, EventEmitter } from '@angular/core';
import { ConnectedService } from '../../services/connected.service'

@Component({
  selector: 'comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: []
})
export class CommentPreviewComponent implements OnInit {

  @Input() comment;
  @Input() isNestedComment;
  @Output() toggleReplyForm = new EventEmitter
  @ViewChildren('elReplyBtn') elReplyBtn: ElementRef



  constructor(private ConnectedService: ConnectedService) { }

  ngOnInit(): void {
  }


  /// save only replied comments
  saveComment(newComment) {
    this.ConnectedService.saveComment({ newComment, replyedCommentId: this.comment._id });
  }

  

}
