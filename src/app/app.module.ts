import { BrowserModule } from '@angular/platform-browser';
import { NgModule , LOCALE_ID  } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app/app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './cmps/nav-bar/nav-bar.component';
import { RecipeListComponent } from './cmps/recipe-list/recipe-list.component';

import { registerLocaleData } from '@angular/common';
import localeHe from '@angular/common/locales/he';
import { RecipePreviewComponent } from './cmps/recipe-preview/recipe-preview.component';
import { FooterComponent } from './cmps/footer/footer.component';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';
import { RecipeFilterComponent } from './cmps/recipe-filter/recipe-filter.component';
import { RecipeByLabelComponent } from './pages/recipe-by-label/recipe-by-label.component';
import { RecipeCommentComponent } from './cmps/recipe-comment/recipe-comment.component';
import { CommentListComponent } from './cmps/comment-list/comment-list.component';
import { CommentPreviewComponent } from './cmps/comment-preview/comment-preview.component';
import { CommentRelativeTimePipe } from './pipes/comment-relative-time.pipe';
import { CommentFormComponent } from './cmps/comment-form/comment-form.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { RecipeEditComponent } from './pages/recipe-edit/recipe-edit.component';
import { AddCountStepPrepPipe } from './pipes/add-count-step-prep.pipe';
import { ModalComponent } from './cmps/modal/modal.component';
import { CountRecipePipe } from './pipes/count-recipe.pipe';
registerLocaleData(localeHe);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    RecipeListComponent,
    RecipePreviewComponent,
    FooterComponent,
    RecipeDetailsComponent,
    RecipeFilterComponent,
    RecipeByLabelComponent,
    RecipeCommentComponent,
    CommentListComponent,
    CommentPreviewComponent,
    CommentRelativeTimePipe,
    CommentFormComponent,
    AboutComponent,
    LoginComponent,
    RecipeEditComponent,
    AddCountStepPrepPipe,
    ModalComponent,
    CountRecipePipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'dlzwnajfq' , secure: true}),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
