import { Component, OnInit , Output , EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: []
})
export class CommentFormComponent implements OnInit {

  @Input() atCommentPreview
  @Output() onSaveComment = new EventEmitter();
  constructor() { }
  name
  desc
 

  ngOnInit(): void {
    
  }

  onSubmitComment(){
 
    if (!this.name || !this.desc) return;

    this.onSaveComment.emit({name:this.name , desc:this.desc});
    this.name = '';
    this.desc = '';
   
    
    
   
    
    
    
    
    
    
  }

}
