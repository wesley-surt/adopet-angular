import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalCardForDialogComponent } from './animal-card-for-dialog.component';

describe('AnimalCardForDialogComponent', () => {
  let component: AnimalCardForDialogComponent;
  let fixture: ComponentFixture<AnimalCardForDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalCardForDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalCardForDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
