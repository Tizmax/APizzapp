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
  }
  
  fetchOrders(): void {
    this.planningService.getAllOrders().subscribe({
      next: (orders: Order[]) => {
        this.planning = orders;
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
}
