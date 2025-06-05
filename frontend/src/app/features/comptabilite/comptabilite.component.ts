import { Component, OnInit } from '@angular/core';
import { PlanningService }   from '../../services/planning.service';
import { Order }             from '../../shared/models/order.model';

@Component({
  selector: 'app-comptabilite',
  standalone: false,
  templateUrl: './comptabilite.component.html',
  styleUrls: ['./comptabilite.component.css']
})
export class ComptabiliteComponent implements OnInit {
  orders: Order[] = [];
  isLoading = true;
  error: string | null = null;
  
  // Statistiques
  totalOrders = 0;
  totalRevenue = 0;
  averageOrderValue = 0;
  totalPizzaCount = 0;

  topSellingPizzas: Array<{ name: string; count: number; revenue: number }> = [];
  timeSlotDistribution: { [key: string]: number } = {};

  constructor(private planningService: PlanningService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.error = null;
    
    this.planningService.getAllOrders().subscribe({
      next: (orders: Order[]) => {
        this.orders = orders;
        this.calculateStatistics();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des commandes:', err);
        this.error = 'Impossible de charger les données. Veuillez réessayer plus tard.';
        this.isLoading = false;
      }
    });
  }

  calculateStatistics(): void {
    // Réinitialisation des compteurs avant de recalculer
    this.totalOrders = this.orders.length;
    this.totalRevenue = 0;
    this.averageOrderValue = 0;
    this.totalPizzaCount = 0;
    this.topSellingPizzas = [];
    this.timeSlotDistribution = {};

    // Statistique de revenu total
    this.totalRevenue = this.orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    // Valeur moyenne
    this.averageOrderValue = this.totalRevenue / this.totalOrders;

    // Comptage des pizzas vendues
    const pizzaCounter: { [key: string]: { name: string; count: number; revenue: number } } = {};
    console.log('Orders reçues :', this.orders);
    this.orders.forEach(order => {
      order.orderItems.forEach(item => {
        const pizzaName = item.pizza.name;

        if (!pizzaCounter[pizzaName]) {
          pizzaCounter[pizzaName] = { name: pizzaName, count: 0, revenue: 0 };
        }

        pizzaCounter[pizzaName].count += item.quantity;
        const pizzaRevenue = item.quantity * item.pizza.price;
        pizzaCounter[pizzaName].revenue += pizzaRevenue;

        this.totalPizzaCount += item.quantity;
      });
    });

    // Top 5 pizzas les plus vendues, en utilisant le type inline
    this.topSellingPizzas = Object.values(pizzaCounter)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Distribution par créneau horaire
    this.orders.forEach(order => {
      const timeSlot = order.scheduledTime;
      this.timeSlotDistribution[timeSlot] =
        (this.timeSlotDistribution[timeSlot] || 0) + 1;
    });
  }

  refresh(): void {
    this.loadData();
  }
}
