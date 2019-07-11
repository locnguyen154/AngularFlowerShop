import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerAddComponent } from './flower-add.component';

describe('FlowerAddComponent', () => {
  let component: FlowerAddComponent;
  let fixture: ComponentFixture<FlowerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
