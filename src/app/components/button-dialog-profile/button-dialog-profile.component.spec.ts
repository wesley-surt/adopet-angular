import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDialogProfileComponent } from './button-dialog-profile.component';

describe('ButtonDialogProfileComponent', () => {
  let component: ButtonDialogProfileComponent;
  let fixture: ComponentFixture<ButtonDialogProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonDialogProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonDialogProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
