import { Component, OnInit, Input ,ViewChild ,Output ,EventEmitter, ElementRef } from '@angular/core';


@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: [],
})
export class CommentListComponent implements OnInit {

  @Input() comments;
  @Output() onToggleReplyForm = new EventEmitter
  


  constructor() {  }

  ngOnInit(): void {
   
  }
    

}
