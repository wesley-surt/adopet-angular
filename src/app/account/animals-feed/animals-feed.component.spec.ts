import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsFeedComponent } from './animals-feed.component';

describe('AnimalsFeedComponent', () => {
  let component: AnimalsFeedComponent;
  let fixture: ComponentFixture<AnimalsFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalsFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
