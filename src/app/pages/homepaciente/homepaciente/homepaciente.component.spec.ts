import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepacienteComponent } from './homepaciente.component';

describe('HomepacienteComponent', () => {
  let component: HomepacienteComponent;
  let fixture: ComponentFixture<HomepacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
