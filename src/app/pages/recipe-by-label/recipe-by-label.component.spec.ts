import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeByLabelComponent } from './recipe-by-label.component';

describe('RecipeByLabelComponent', () => {
  let component: RecipeByLabelComponent;
  let fixture: ComponentFixture<RecipeByLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeByLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeByLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
