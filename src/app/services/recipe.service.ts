import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service'
import { UtilService } from './utils.service'
import { Recipe } from '../models/recipe.model'

import Axios from 'axios';
import { Cloudinary } from '@cloudinary/angular-5.x'; 

import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


const CLOUDINARY_URL = 'cloudinary://289781188649973:ddulu0DxweH29CyUYUYkfzKAtwI@dlzwnajfq';

const LABELS = ['צמחוני', 'מאפים', 'תבשילים', 'ילדים', 'טבעוני', 'חלבי', 'בשר', 'עוף', 'ירקות', 'עוגות', 'עוגיות']

@Injectable({
    providedIn: 'root'
})


export class RecipesService {

    constructor(private StorageService: StorageService,
        private UtilService: UtilService,
        private cloudinary: Cloudinary,
        private http: HttpClient) { }


    private API_URL = environment.API_URL;
    private BASE_URL = `${this.API_URL}/api/recipe`


    public labels = LABELS;

    private _recipes$ = new BehaviorSubject<Recipe[]>([]);
    public recipes$ = this._recipes$.asObservable();


    loadRecipes(filterBy) {
    
        this.http.get<Recipe[]>(`${this.BASE_URL}?q=${filterBy}`)
            .pipe(
                map(recipes => recipes)).subscribe(recipes => this._recipes$.next(recipes));

    }

    public getRecipeById(recipeId) {

        return this.http.get<Recipe[]>(this.BASE_URL + `/${recipeId}`)
            .pipe(
                catchError(() => throwError('no recipe found'))
            )
    }

    public async removeRecipe(recipeId) {

        return await this.http.delete(`${this.BASE_URL}/${recipeId}`)
            .pipe(
                tap((newRecipes: []) => { this._recipes$.next(newRecipes) }),
                catchError(() => throwError('cannot remove recipe'))
            ).toPromise()

    }

    public async saveRecipe(newRecipe) {


        if (newRecipe._id) {

            return await this.http.put(`${this.BASE_URL}/${newRecipe._id}`, newRecipe)
                .pipe(
                    map(recipe => recipe),
                    catchError(() => throwError('cannot save recipe'))).toPromise();
        } else {
            newRecipe.createdAt = Date.now();
            newRecipe.comments = [];
            return await this.http.post(this.BASE_URL, newRecipe)
                .pipe(
                    map(recipe => recipe),
                    catchError(() => throwError('cannot save recipe'))).toPromise()
        }
    }

    public async saveComment({ newComment, replyedCommentId }, recipe) {


        newComment.createdAt = Date.now();
        newComment.comments = [];

        var findIn = recipe.comments;
        if (replyedCommentId) {

            this.addComment(newComment, replyedCommentId, findIn);

        } else {

            newComment._id = this.UtilService.makeId();
            recipe.comments.unshift(newComment);
        }
        await this.saveRecipe(recipe);


    }

    private addComment(newComment, replyedCommentId, findIn) {


        findIn.forEach(comment => {

            if (replyedCommentId === comment._id) {

                newComment._id = this.UtilService.makeId();
                comment.comments.push(newComment);
                return;


            } else {

                if (!comment.comments || !comment.comments.length) return;
                findIn = comment.comments;
                this.addComment(newComment, replyedCommentId, findIn);
            }


            return;
        });


    }


    public async uploadImg(ev) {


        const CLOUD_NAME = 'dlzwnajfq';
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

        const formData = new FormData();
        formData.append('file', ev.target.files[0]);
        formData.append('upload_preset', 'aeyn7n9g');
        
        try {
            const res = await Axios.post(UPLOAD_URL, formData);
            return res.data.secure_url;
        } catch (err) {
            console.error(err)
        }

    }

}




