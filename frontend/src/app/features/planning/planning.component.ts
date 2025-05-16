import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/models/order.model';
import { PlanningService } from '../../services/planning.service';

@Component({
  selector: 'app-planning',
  standalone: false,
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  planning: Order[] = [];

  constructor(private planningService: PlanningService) {}

  ngOnInit(): void {
    // Appel au service pour récupérer les commandes depuis l'API
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
    this.planning = this.planning.filter(order => order.id !== id);
    console.log(`Commande ${id} supprimée.`);
  }
}
