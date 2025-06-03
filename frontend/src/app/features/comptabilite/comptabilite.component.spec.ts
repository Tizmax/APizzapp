import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptabiliteComponent } from './comptabilite.component';

describe('ComptabiliteComponent', () => {
  let component: ComptabiliteComponent;
  let fixture: ComponentFixture<ComptabiliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComptabiliteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComptabiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
