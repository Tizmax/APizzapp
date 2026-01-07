import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { ModifiedPizza } from '../shared/models/pizza.model'; // Votre modèle Pizza
import { OrderItem } from '../shared/models/order.model';
import { PizzaSize } from '../shared/models/pizza-size.model';

// Interface pour un article dans le panier (inchangée)


@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Utiliser un tableau privé pour stocker les items
  private items: OrderItem[] = [];

  constructor() {
    // Charger le panier depuis localStorage au démarrage du service
    if (typeof window !== 'undefined' && window.localStorage) {
      this.items = this.loadCartFromLocalStorage();
    } else {
      this.items = [];
    }
  }

  private saveCartToLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('pizzeriaCart', JSON.stringify(this.items));
    }
  }

  private loadCartFromLocalStorage(): OrderItem[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const cartData = localStorage.getItem('pizzeriaCart');
      return cartData ? JSON.parse(cartData) : [];
    }
    return [];
  }

  // Méthodes pour que les composants récupèrent les données du panier
  getCartItems(): OrderItem[] {
    // Retourner une copie pour éviter la modification directe de l'array privé depuis l'extérieur
    // et pour aider potentiellement la détection de changement d'Angular si la référence change.
    return [...this.items];
  }

  // getCartTotalPrice(): number {
  //   return this.items.reduce((total, item) => {
  //     return total + (item.calculatedItemPrice * item.quantity);
  //   }, 0);
  // }

  getCartItemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }


  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Méthodes pour modifier le panier
  addItem(half1 : ModifiedPizza , half2: ModifiedPizza, size: PizzaSize): void {
    // const calculatedItemPrice = this.calculatePriceForPizzaConfiguration(pizza, addedSupplements);
    
    const newItem: OrderItem = {
      id: this.generateUUID(), // id temporaire unique (ne sera pas écrit en db)
      orderId: 0, // la commande n'existe pas encore en db
      half1: half1,
      half2: half2,
      size: size,
      quantity: 1
    };

    this.items.push(newItem);
    this.saveCartToLocalStorage();
    // IMPORTANT: Les composants ne sont PAS notifiés automatiquement du changement.
  }

  // private calculatePriceForPizzaConfiguration(pizza: Pizza, addedSupplements: Ingredient[]): number {
  //   let price = pizza.basePrice;
  //   addedSupplements.forEach(sup => {
  //     if (sup.supplementPrice) {
  //       price += sup.supplementPrice;
  //     }
  //   });
  //   return price;
  // }

  updateItemQuantity(tempId: string, newQuantity: number): void {
    const itemIndex = this.items.findIndex(item => item.id === tempId);
    if (itemIndex > -1) {
      if (newQuantity > 0) {
        this.items[itemIndex].quantity = newQuantity;
      } else {
        // Ask for confirmation before removing the item
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article du panier ?')) {
          // If user cancels, set quantity to 1 instead of removing
          this.items[itemIndex].quantity = 1;
          this.saveCartToLocalStorage();
          return;
        } else {
          this.items.splice(itemIndex, 1); // Supprimer l'item si quantité <= 0
        }
      }
      this.saveCartToLocalStorage();
      // IMPORTANT: Notification manuelle nécessaire pour les composants.
    }
  }
 
  removeItem(tempId: string): void {
    this.items = this.items.filter(item => item.id !== tempId);
    this.saveCartToLocalStorage();
  }

  clearCart(): void {
    this.items = [];
    this.saveCartToLocalStorage();
  }
}