import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundHeroesComponent } from './not-found-heroes.component';

describe('NotFoundHeroesComponent', () => {
  let component: NotFoundHeroesComponent;
  let fixture: ComponentFixture<NotFoundHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundHeroesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotFoundHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
