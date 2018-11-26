import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisdietasComponent } from './misdietas.component';

describe('MisdietasComponent', () => {
  let component: MisdietasComponent;
  let fixture: ComponentFixture<MisdietasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisdietasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisdietasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
