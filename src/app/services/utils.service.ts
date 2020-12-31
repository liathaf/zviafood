import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })


export class UtilService{

    public makeId(length = 6) {
        var txt = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        
        for (var i = 0; i < length; i++) {
            txt += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return txt;
    }
}

