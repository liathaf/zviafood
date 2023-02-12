import { Component , ViewChild , ElementRef ,Output, EventEmitter ,Input, HostListener , Inject , PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser} from '@angular/common';
import { Router } from '@angular/router';
import {ConnectedService} from '../../services/connected.service'


@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: [],
  

})
export class NavBarComponent{

  @Input() labels;
  @Input() atLogin;
  @Input() isLoggedIn;
  @Input() isOpenSceen;
  @Output() onOpenMenu = new EventEmitter();
  @ViewChild('manu') input: ElementRef;
  @ViewChild('navBarLinks') navBarLinks: ElementRef;
  @ViewChild('addNewRecipeLink') addNewRecipeLink: ElementRef;
  isOpenManu;
  isScrolled;
  linksClicked;


  // listen to the scroll for the nav-bar tranformation 
  @HostListener('window:scroll') onScrollEvent(){

    if (isPlatformBrowser(this.platformId)){
      
      const positionY = window.scrollY;
      if ((positionY) > 140) this.isScrolled = true;
      else this.isScrolled = false;
      
    }
    
  }
  


  constructor(private ConnectedService: ConnectedService , private router: Router , @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
  
  }


  // for home and about links - on load, mark the link accordingly to the current page
  ngAfterViewInit(){
    setTimeout(() => {
        this.ConnectedService.linkVal$.subscribe(linkVal => this.toggleLinks(linkVal));
    }, 0);
  }


  toggleManu(){ // for mobile/narrow tablet manu

    const elLinksManu = this.input.nativeElement;
    
    if (this.isOpenManu) elLinksManu.style.right = '-300px';
    else elLinksManu.style.right = '0';
       
    this.isOpenManu = !this.isOpenManu;
    this.onOpenMenu.emit(this.isOpenManu); 
 
  }
  
  toggleLinks(linkVal){
    
    if (!this.navBarLinks) return; // nav-bar-links are on display none on login page
    
    const elLinks = this.navBarLinks.nativeElement.querySelectorAll('.main-link');
    elLinks.forEach(link => {
      if (link.classList.contains(linkVal)) link.classList.add('clicked-link');
      else link.classList.remove('clicked-link')
    })

    this.input.nativeElement.style.right = '-300px';
    this.isOpenManu = false;
    this.onOpenMenu.emit(this.isOpenManu);

    

  }

  // goToRecipeEdit(){ /// this function is disables the hover effect for 1sec when navigate to edit page
  //   this.addNewRecipeLink.nativeElement.style.pointerEvents = 'none';
  //   setTimeout(() => {
  //     this.addNewRecipeLink.nativeElement.style.pointerEvents = 'unset';
  //   }, 1000);
  //   this.router.navigateByUrl('/recipe/edit');
  // }
  

  mainlinksNavigation(path){ /// when navigate to home/about
    this.router.navigateByUrl(path);
    this.toggleManu();
  }

}
