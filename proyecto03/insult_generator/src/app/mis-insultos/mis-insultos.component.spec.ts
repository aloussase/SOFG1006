import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisInsultosComponent } from './mis-insultos.component';

describe('MisInsultosComponent', () => {
  let component: MisInsultosComponent;
  let fixture: ComponentFixture<MisInsultosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisInsultosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisInsultosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
