import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedAdoptionComponent } from './feed-adoption.component';

describe('FeedAdoptionComponent', () => {
  let component: FeedAdoptionComponent;
  let fixture: ComponentFixture<FeedAdoptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedAdoptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedAdoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
