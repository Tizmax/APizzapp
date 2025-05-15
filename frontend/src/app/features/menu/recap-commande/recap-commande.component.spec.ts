import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapCommandeComponent } from './recap-commande.component';

describe('RecapCommandeComponent', () => {
  let component: RecapCommandeComponent;
  let fixture: ComponentFixture<RecapCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecapCommandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecapCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
