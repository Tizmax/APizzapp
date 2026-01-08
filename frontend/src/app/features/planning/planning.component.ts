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
          const timeCompare = a.scheduledTime.localeCompare(b.scheduledTime);
          if (timeCompare !== 0) {
            return timeCompare;
          }
          return a.id - b.id; // Assure la stabilité du tri au sein du quart d'heure
        });
        this.calculateRowspans();
        console.log('Commandes récupérées depuis le backend :', this.planning);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commandes : ', err);
      }
    });
  }

  calculateRowspans() {
    if (!this.planning || this.planning.length === 0) return;

    for (let i = 0; i < this.planning.length; i++) {
      const currentOrder = this.planning[i];
      
      // Si c'est la première ligne ou si l'heure change par rapport à la ligne précédente
      if (i === 0 || currentOrder.scheduledTime !== this.planning[i - 1].scheduledTime) {
        let count = 0;
        
        // On compte combien de commandes suivent avec le même horaire
        for (let j = i; j < this.planning.length; j++) {
          if (this.planning[j].scheduledTime === currentOrder.scheduledTime) {
            count++;
          } else {
            break; // On sort de la boucle dès que l'heure change
          }
        }
        
        // On assigne le compte à la première commande du bloc
        currentOrder.rowspan = count;
      } else {
        // Pour les autres lignes du même créneau, on met 0 (elles seront masquées)
        currentOrder.rowspan = 0;
      }
    }
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
      'EN ATTENTE',
      'RANGÉE',
      'PARTIE',
    ];

    const idx = etats.indexOf(current);
    const nextIdx = idx === etats.length - 1 ? 0 : idx + 1;
    const newStatus = etats[nextIdx];

    // this.planningService.updateOrderStatus(order.id, newStatus).subscribe({
    //   next: (updatedOrder: Order) => {
    //     order.status = updatedOrder.status;
    //   },
    //   error: (err: any) => {
    //     console.error('Erreur lors de la mise à jour de l’état :', err);
    //   }
    // });
  }


}
