// landing.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent { 
  pizzas = [
    { name: 'AI_Pizza', imgUrl: 'images/pizzas/ai_pizza.webp' },
    { name: 'Reine', imgUrl: 'images/pizzas/reine.png' },
    { name : 'Pepperoni', imgUrl: 'images/pizzas/pepperoni.png' },
    { name: 'Cheese', imgUrl: 'images/pizzas/cheese.png' },
    { name: 'Poivron', imgUrl: 'images/pizzas/poivron.png' },
    { name:'Olive', imgUrl: 'images/pizzas/olive.png' },
    // autres pizzas...
  ];

  // Tableau qui contiendra le tableau original dupliqué plusieurs fois
  duplicatedPizzas: Array<any> = [];

  ngOnInit(): void {
    const duplications = 10; // Choisis ici le nombre de fois que tu souhaites répéter le tableau
    for (let i = 0; i < duplications; i++) {
      this.duplicatedPizzas = this.duplicatedPizzas.concat(this.pizzas);
    }
  }
}
