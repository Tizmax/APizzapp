import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PizzaService } from '../../services/pizza.service';

@Component({
  selector: 'app-detail-produit',
  imports: [],
  templateUrl: './detail-produit.component.html',
  styleUrl: './detail-produit.component.css'
})
export class DetailProduitComponent {

  constructor(private route: ActivatedRoute, private pizzaService: PizzaService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.pizzaService.getPizzaById(id).subscribe()
  }
}
