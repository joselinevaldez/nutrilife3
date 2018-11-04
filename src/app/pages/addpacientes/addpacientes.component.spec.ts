import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpacientesComponent } from './addpacientes.component';

describe('AddpacientesComponent', () => {
  let component: AddpacientesComponent;
  let fixture: ComponentFixture<AddpacientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpacientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
