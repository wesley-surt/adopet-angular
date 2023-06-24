import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAngularComponent } from './test-angular.component';

describe('TestAngularComponent', () => {
  let component: TestAngularComponent;
  let fixture: ComponentFixture<TestAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAngularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
