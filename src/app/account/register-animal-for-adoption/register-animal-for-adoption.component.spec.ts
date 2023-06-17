import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAnimalForAdoptionComponent } from './register-animal-for-adoption.component';

describe('RegisterAnimalForAdoptionComponent', () => {
  let component: RegisterAnimalForAdoptionComponent;
  let fixture: ComponentFixture<RegisterAnimalForAdoptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAnimalForAdoptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAnimalForAdoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
