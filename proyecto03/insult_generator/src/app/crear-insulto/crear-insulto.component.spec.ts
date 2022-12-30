import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInsultoComponent } from './crear-insulto.component';

describe('CrearInsultoComponent', () => {
  let component: CrearInsultoComponent;
  let fixture: ComponentFixture<CrearInsultoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearInsultoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearInsultoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
