import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalCardDialogComponent } from './animal-card-dialog.component';

describe('AnimalCardDialogComponent', () => {
  let component: AnimalCardDialogComponent;
  let fixture: ComponentFixture<AnimalCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalCardDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
