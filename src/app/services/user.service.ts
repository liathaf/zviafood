import { Injectable , Inject , PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser} from '@angular/common';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { StorageService } from './storage.service';
import { User } from '../models/user.model';




const KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private StorageService:StorageService , private http: HttpClient , @Inject(PLATFORM_ID) private platformId: Object) { }

  private API_URL = environment.API_URL;
  private BASE_URL = `${this.API_URL}/api/auth`

  private _user$ = new BehaviorSubject<User>({_id:'',username: '',password:''})
  public user$ = this._user$.asObservable();

  public async login(user){
    try {
      const savedUser = await this.http.post<any>(`${this.BASE_URL}/login` , user)
          .pipe(
            tap((user)=> this._user$.next(user))).toPromise();
      
      if (isPlatformBrowser(this.platformId)) {
        sessionStorage.setItem('user', JSON.stringify(savedUser))
      }
      
    } catch({error}) {
      throw 'שם המשתמש/סיסמא לא נכונים'
    }
     
    
  }
  
  public isLoggedinUser(){ 
    if (isPlatformBrowser(this.platformId)){
      if (sessionStorage.getItem('user')) return true ;
    }
    
        
     
  }


}
