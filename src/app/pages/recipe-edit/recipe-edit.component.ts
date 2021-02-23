import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {RecipesService} from '../../services/recipe.service';
import { ActivatedRoute , Router } from '@angular/router';



@Component({
  selector: 'recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: [],

})
export class RecipeEditComponent implements OnInit {

  @ViewChild('imgInput') imgInput: ElementRef;
  @ViewChild('yieldLabel') yieldLabel: ElementRef;
  @ViewChild('elLabel') elLabel: ElementRef;
  @ViewChild('elUnitIngri') elUnitIngri: ElementRef;
  @ViewChild('elIngriTitle') elIngriTitle: ElementRef;
  
  recipe = null;

  imgName;
  selectedImgs = [];
  uploadedImgs = [];
  isShowYieldOptains;
  isShowLabelOptains;
  isShowUnitIngriOptains;
  recipeTitle;
  recipeDesc;
  chosenYieldUnit;
  yieldCount;
  tool;
  labels;
  label;
  tools = [];
  chosenLabels = [];
  ingriSectionTitle;
  countIngri = '';
  ingriName;
  chosenIngriUnit ='';
  ingriToEdit = null;
  allIngredients = [];
  preps = [];
  howToPreper;
  prepSectionTitle;
  prepToEdit = null;
  note;
  notes = [];

  addYieldMsg;
  addIngriMsg;
  addTooliMsg;
  addHowToPreperiMsg;
  addNoteMsg;
  saveRecipeMsg;

  atRecipeEdit = true;
  isRecipeGoingToBeSaved;


  constructor(private RecipesService: RecipesService , private route: ActivatedRoute , private router:Router) { }

  ngOnInit(): void {

    // recipe from the recipe-resolver-service
    this.route.data.subscribe(data => {
      if (data.recipe) this.recipe = data.recipe;
    });

    this.labels = this.RecipesService.labels;


    /// when recipe is exist and the user want to edit the recipe
    if (this.recipe){
      this.recipeTitle = this.recipe.title;
      this.uploadedImgs = this.recipe.imgUrls;
      this.selectedImgs = this.recipe.imgUrls.map(img => {return img.imgName});
      this.recipeDesc = this.recipe.desc;
      if (this.recipe.yield) {
        this.yieldCount = this.recipe.yield.yieldCount;
        this.chosenYieldUnit = this.recipe.yield.yieldUnit;
      } 
      
      this.tools = (this.recipe.tools.length)? this.recipe.tools : [];
      this.chosenLabels = this.recipe.labels;
      this.allIngredients = this.recipe.allIngredients;
      this.preps = this.recipe.howToPrepare;
      this.notes = this.recipe.notes;
    }

  }

  ngAfterViewInit() {
    /// when recipe is exist , yieldUnit inner text elment must update 
    setTimeout(() => {
      if (this.recipe && this.recipe.yield) this.yieldLabel.nativeElement.innerText = this.recipe.yield.yieldUnit;
    }, 0);
  }

  onClickToUploagImg(ev) { // when clicking on the upload button, this function trigers a click event on input type file 
    this.imgInput.nativeElement.click();
    this.imgName = ev.target.name; // update which button user clicked to upload img
    
    
  }

  onUploadImg(ev) { // when event click trigerd , this function updetes the selected img url
    
    if (!ev.target.files[0]) return; // when user canceles the upload img folder, no img is chosen
    ev.imgName = this.imgName;
    
    if (!this.selectedImgs.length || !this.selectedImgs.includes(this.imgName)) {
      this.selectedImgs.push(this.imgName); // if img  does not exist yet in the list , add to the list of the selectd img
    }
    if (this.selectedImgs.includes(this.imgName)) this.removeImg(); // if it existes  , delete the name from the list for the loading img animation
    this.uploadeImg(ev); // upload img to Cloudinary
    ev.target.value= '' // This ensures that the change event will be triggered for the same file as well(same url). 
  }


  async uploadeImg(ev) {
    
    try {
      const imgUrl = await this.RecipesService.uploadImg(ev);
      var isImgUrlUpdated;

      /// after the img url was loaded to cloudinary , updete the uploadedImgs list of objects
      if (this.uploadedImgs.length) { 
        this.uploadedImgs.forEach(img => {
          if (img.imgName === ev.imgName) {
            img.imgUrl = imgUrl;
            isImgUrlUpdated = true;
          }
        });       
        
      }
      if (!this.uploadedImgs.length || !isImgUrlUpdated) {
        this.uploadedImgs.push({ imgName: ev.imgName, imgUrl })
      }
  
    } catch (err) {
      console.log('cannot upload img to Cloudinary');

    }

  }

    removeImg(){
    this.uploadedImgs.forEach(img=>{
      if(img.imgName === this.imgName) img.imgUrl = '';
    });
    
  }


  isImgLoaded(imgName) {
    return this.uploadedImgs.some(img => {
      return ((imgName === img.imgName) && img.imgUrl);
    });
  }

  isClickedImgUpload(imgName) {
    if (imgName === this.imgName) {
      return true
    };
  }

  isSelecedImg(imgName) {
    if (this.selectedImgs.length && this.selectedImgs.includes(imgName)) {
      return true
    };
  }

  saveYieldUnit(ev) {
    this.chosenYieldUnit = ev.target.innerHTML;
    this.isShowYieldOptains = !this.isShowYieldOptains;
    this.yieldLabel.nativeElement.innerHTML = this.chosenYieldUnit;
  }


  showYieldDropDowm() {
    this.isShowYieldOptains = !this.isShowYieldOptains;
    this.isShowUnitIngriOptains = false;
    this.isShowLabelOptains = false;
  }

  addTool() {
    if (!this.tool) {
      this.addTooliMsg = 'יש להזין ציוד';
      return;
    }
    this.tools.push(this.tool);
    this.addTooliMsg = '';
    this.tool = '';
  }

  removeTool({toolName , idx}) {

    this.tools = this.tools.filter((tool , index) => {
      if (index !== idx) return tool;
      return tool !== toolName;
    });


  }

  saveLabel(ev) {
    const chosenLabel = ev.target.innerHTML
    if (!this.chosenLabels.includes(chosenLabel)) {
      this.chosenLabels.push(chosenLabel);
    }
    this.isShowLabelOptains = !this.isShowLabelOptains;
    this.elLabel.nativeElement.innerHTML = 'בחר תגיות';

  }

  removeLabel(labelName) {
    this.chosenLabels = this.chosenLabels.filter(label => {
      return label !== labelName;
    });
  }

  showLabelDropDowm() {
    this.isShowLabelOptains = !this.isShowLabelOptains;
    this.isShowYieldOptains = false;
    this.isShowUnitIngriOptains = false;
  }

  saveUnitIngri(ev) {
    this.chosenIngriUnit = ev.target.innerHTML;
    this.isShowUnitIngriOptains = !this.isShowUnitIngriOptains;
    this.elUnitIngri.nativeElement.innerHTML = this.chosenIngriUnit;
  }

  addIngredients() {

    
    const newIngri = this.countIngri + ' ' + this.chosenIngriUnit + ' ' + this.ingriName;
    var isNewIngriAdded;

    if (!this.ingriName) {
      this.addIngriMsg = 'יש להכניס מרכיב';
      return
    };

    if (this.allIngredients.some(ingr => { return ingr.ingriSectionTitle }) // if the user already add titles to the ingri,
      /// he needs to continue to add titles to all of the ingri
      && !this.ingriSectionTitle) {
      this.addIngriMsg = 'יש להכניס כותרת למרכיב';
      return;
    }

    this.allIngredients.forEach(ingri => { // add ingri to all of the ingri list , if the title for the ingri is already exists
      if ((ingri.ingriSectionTitle === this.ingriSectionTitle) && this.ingriSectionTitle) {
        ingri.ingredients.push(newIngri);
        isNewIngriAdded = true;
      }
    });

    if (!isNewIngriAdded) { // if the ingri is not added yet beacuse it does not need title or the title does not exists yet
      //, the ingri are added

      if (!this.ingriSectionTitle ||
        this.allIngredients.some(ingr => { return !ingr.ingriSectionTitle })) {

        this.allIngredients.push(newIngri);
        this.ingriSectionTitle = '';

      } else {
        this.allIngredients.push({
          ingriSectionTitle: this.ingriSectionTitle,
          ingredients: [newIngri]
        });
      }
    }

    this.addIngriMsg = '';
    this.countIngri = '';
    this.ingriName = '';
    this.chosenIngriUnit = '';
    this.elUnitIngri.nativeElement.innerHTML = 'בחר יחידות';

  }

  onEditIngri({ingri, ingriSectionTitle , idx}){
    this.ingriToEdit = {
      idx,
      ingriSectionTitle,
      ingri
    }

  }

  onSaveEditIngri({ingriSectionTitle , idx}){
   
    this.allIngredients =  this.allIngredients.map((ingri , index) => {

      if (ingri.ingriSectionTitle) { // if the ingri has a title

         if (ingri.ingriSectionTitle === ingriSectionTitle) { // if the ingri to edit has a the same title has the curr title

            return {
              ingriSectionTitle : ingri.ingriSectionTitle,
              ingredients: ingri.ingredients.map((ingr , currIngIdx) => { 

                if (currIngIdx === idx) return this.ingriToEdit.ingri
                else return ingr
              })
            }

         } else return {
            ingriSectionTitle : ingri.ingriSectionTitle,
            ingredients: ingri.ingredients
         }
          
      } else { // if the ingri has no title
        if (index === idx) return this.ingriToEdit.ingri;
        else return ingri;
      }

    

    });
    
    this.ingriToEdit = null;

  }

  removeIngri(ingredient) {

    var newIngrs = [] // making new list of ingri without the the removed ingri
   
    
    this.allIngredients.forEach((ingri , index) => {

      if (ingri.ingriSectionTitle) { // if the ingri has a title
        
         
        if (ingri.ingredients.includes(ingredient.ingri) 
        && (ingri.ingriSectionTitle === ingredient.ingriSectionTitle)) {
          if (ingri.ingredients.length === 1) return;
          else newIngrs.push({
            ingriSectionTitle: ingri.ingriSectionTitle,
            ingredients: ingri.ingredients.filter((ing , idx) => {
              return idx !== ingredient.idx
            })
          });
          
        } else newIngrs.push({
          ingriSectionTitle: ingri.ingriSectionTitle,
          ingredients: ingri.ingredients
        });
         
      } else {  // if the ingri has no title

        if (index !== ingredient.idx) newIngrs.push(ingri);
        if (index === ingredient.idx) return;
      
      
      };
    });

    this.allIngredients = newIngrs;
    this.ingriToEdit = null;

  }

  showIngriUnitDropDowm(){
  this.isShowUnitIngriOptains = !this.isShowUnitIngriOptains;
  this.isShowYieldOptains = false;
  this.isShowLabelOptains = false;
  }

  addHowToPreper(){


  var isNewPrepAdded;

  if (!this.howToPreper) {
  this.addHowToPreperiMsg = 'יש להכניס הוראות הכנה';
  return
  };

  if (this.preps.some(prep => { return prep.title })
  && !this.prepSectionTitle) {
  this.addHowToPreperiMsg = 'יש להכניס כותרת להוראות הכנה';
  return;
  }

  this.preps.forEach(prep => {
  if ((prep.title === this.prepSectionTitle) && this.prepSectionTitle) {
    prep.steps.push(this.howToPreper);
    isNewPrepAdded = true;
  }
  });

  if (!isNewPrepAdded) {

  if (!this.prepSectionTitle ||
    this.preps.some(prep => { return !prep.title })) {

    this.preps.push(this.howToPreper);
    this.prepSectionTitle = '';

  } else {
    this.preps.push({
      title: this.prepSectionTitle,
      steps: [this.howToPreper]
    });
  }
  }

  this.howToPreper = '';

  }

  onEditprep({prep, title , idx}){
    this.prepToEdit = {
      idx,
      title,
      prep
    }

  }

  onSaveEditPrep({title , idx}){
   
    this.preps =  this.preps.map((prep , index) => {

      if (prep.title) { // if the prep has a title

         if (prep.title === title) { // if the prep to edit has a the same title has the curr title

            return {
              title : prep.title,
              steps: prep.steps.map((step , currIngIdx) => { 

                if (currIngIdx === idx) return this.prepToEdit.prep
                else return step
              })
            }

         } else return {
            title : prep.title,
            steps: prep.steps
         }
          
      } else { // if the prep has no title
        if (index === idx) return this.prepToEdit.prep;
        else return prep;
      }

    

    });
    
    this.prepToEdit = null;

  }

  removePrep(howToPreper){

    const newPreps = []
  

    this.preps.forEach((prep , index) => {

      if (prep.title) {

        
          if (prep.steps.includes(howToPreper.howToPreper) && (prep.title === howToPreper.title)) {
            if (prep.steps.length === 1) return 
            else newPreps.push({
              title: prep.title,
              steps: prep.steps.filter((pre , idx) => {
                return idx !== howToPreper.idx
              })
            });
          } else newPreps.push({
            title: prep.title,
            steps: prep.steps
          });
          
        

      } else {
        
        if (index !== howToPreper.idx) newPreps.push(prep);
        if (index === howToPreper.idx) return;

        
      };
    });

    this.preps = newPreps;
    this.prepToEdit = null;
  }


  findIdx(list , element){
    return list.findIndex(el => {
      return el === element
    });
  }


  addNote(){

    if (!this.note) {
      this.addNoteMsg = 'יש להזין הערה';
      return;
    }
    this.notes.push(this.note);
    this.addNoteMsg = '';
    this.note = '';
  }


  removeNote({noteName , idx}){
    
    this.notes = this.notes.filter((note , index) => {
      if (index !== idx) return note;
      return note !== noteName;
    });
  }

  async onSubmitEditForm() {

    var fullYield = null;
    
    
    const  isAllImgLoaded = this.uploadedImgs.every(img => img.imgUrl)

    if (!this.uploadedImgs || this.uploadedImgs.length !==2 || !isAllImgLoaded || !this.recipeTitle || 
      !this.recipeDesc || !this.chosenLabels ||
      !this.allIngredients.length || !this.preps.length) {
        this.saveRecipeMsg = 'יש למלא את המקומות המסומנים בכוכבית';
        return;
      }
    
    if (this.yieldCount && !this.chosenYieldUnit) {
      this.addYieldMsg = "יש למלא יחידות";
      return;
    }
    if (!this.yieldCount && this.chosenYieldUnit) {
      this.addYieldMsg = "יש למלא כמות";
      return;
    }

    if (this.yieldCount && this.chosenYieldUnit) {
      fullYield = {
        yieldUnit: this.chosenYieldUnit,
        yieldCount: this.yieldCount
      }
    }
      if (!this.recipe) this.recipe = {};
      
      this.recipe.title = this.recipeTitle
      this.recipe.desc = this.recipeDesc
      this.recipe.imgUrls = this.uploadedImgs
      this.recipe.yield = fullYield
      this.recipe.tools = this.tools
      this.recipe.labels = this.chosenLabels
      this.recipe.allIngredients = this.allIngredients
      this.recipe.howToPrepare = this.preps
      this.recipe.notes = this.notes
      

      try {

        if (this.isRecipeGoingToBeSaved) return; // preventing from saving the recipe more then once while 
        // user alredy clicked on the saving recipe button

        this.isRecipeGoingToBeSaved = true; // change the content of the button to loading animation
        const savedRecipe:any = await this.RecipesService.saveRecipe(this.recipe);
        this.router.navigate([''],{ relativeTo: this.route , state: {saveRecipeId: savedRecipe._id}});
        this.isRecipeGoingToBeSaved = false;


      }catch(err){
        console.log('edit recipe - cannot save recipe');
        
      }
  }


}
