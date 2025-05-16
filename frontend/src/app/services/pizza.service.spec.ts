import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlanningComponent } from '../features/planning/planning.component';
import { PlanningService } from './planning.service';

describe('PlanningComponent', () => {
  let component: PlanningComponent;
  let fixture: ComponentFixture<PlanningComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PlanningComponent],
      providers: [PlanningService]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanningComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial orders correctly from the service', () => {
    const dummyOrders = [
      {
        id: 1,
        pizzas: [
          { id: 1, name: 'Margherita', basePrice: 12.5, baseIngredients: [] }
        ],
        name: 'Dupont Jean',
        price: 12.50,
        status: 'En attente',
      },
      {
        id: 2,
        pizzas: [
          { id: 2, name: 'Pepperoni', basePrice: 14.0, baseIngredients: [] }
        ],
        name: 'Durand Marie',
        price: 14.00,
        status: 'En attente',
      }
    ];

    const request = httpMock.expectOne('http://localhost:8080/listerOrder');
    expect(request.request.method).toBe('GET');
    request.flush(dummyOrders);

    fixture.detectChanges();
    expect(component.planning.length).toBe(2);
    expect(component.planning[0].name).toBe('Dupont Jean');
  });

  it('should remove an order correctly', () => {
    component.planning = [
      { id: 1, pizzas: [], name: 'Dupont Jean', price: 12.50, status: 'En attente' },
      { id: 2, pizzas: [], name: 'Durand Marie', price: 14.00, status: 'En attente' }
    ];
    
    component.removeOrder(1);
    fixture.detectChanges();
    expect(component.planning.length).toBe(1);
    expect(component.planning[0].name).toBe('Durand Marie');
  });

  it('should not throw error if removing an order from an empty list', () => {
    component.planning = [];
    expect(() => component.removeOrder(999)).not.toThrow();
  });
});