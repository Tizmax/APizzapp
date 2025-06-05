import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/models/order.model';
import { PlanningService } from '../../services/planning.service';
import { PizzaService } from '../../services/pizza.service';

@Component({
  selector: 'app-planning',
  standalone: false,
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  planning: Order[] = [];

  constructor(private planningService: PlanningService,private pizzaService: PizzaService) {}

  ngOnInit(): void {
    // Appel au service pour récupérer les commandes depuis l'API
    this.fetchOrders();
    setInterval(() => {
      this.fetchOrders();
    }, 5000);
  }
  
  fetchOrders(): void {
    this.planningService.getAllOrders().subscribe({
      next: (orders: Order[]) => {
        this.planning = orders.sort((a, b) => {
          return a.scheduledTime.localeCompare(b.scheduledTime);
        });
        console.log('Commandes récupérées depuis le backend :', this.planning);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commandes : ', err);
      }
    });
  }


  removeOrder(id: number): void {
    // Show confirmation dialog
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?');
      
    // Only proceed with deletion if user confirms
    if (confirmation) {
      this.pizzaService.deleteOrder(id).subscribe({
        next: () => {
        this.fetchOrders();
        console.log(`Commande ${id} supprimée.`);
        }
      });
    }
  }

  toggleStatus(order: Order): void {
    const current = order.status ;
    
    const etats = [
      'PENDING',
      'PAID',
      'PREPARING',
      'READY_FOR_PICKUP',
      'CANCELLED'
    ];

    const idx = etats.indexOf(current);
    const nextIdx = idx === etats.length - 1 ? 0 : idx + 1;
    const newStatus = etats[nextIdx];

    this.planningService.updateOrderStatus(order.id, newStatus).subscribe({
      next: (updatedOrder: Order) => {
        order.status = updatedOrder.status;
      },
      error: (err: any) => {
        console.error('Erreur lors de la mise à jour de l’état :', err);
      }
    });
  }


}
