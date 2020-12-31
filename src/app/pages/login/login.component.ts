import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


import { UserService } from '../../services/user.service'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  atLogin = true;
  errorMsg;

  constructor(private UserService:UserService , private router: Router) { }

  ngOnInit(): void {
    
    
  }

  async onLogin(form: NgForm){
    
    const user = form.value;
    if (!user.username || !user.password) return;
    try{
      await this.UserService.login(form.value);
      this.router.navigateByUrl('');

    } catch(err){
      this.errorMsg = err;
    }
      
  }

}
