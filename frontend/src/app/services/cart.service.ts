import { Injectable } from '@angular/core';
import { Pizza } from '../shared/models/pizza.model'; // Votre modèle Pizza
import { Ingredient } from '../shared/models/ingredient.model'; // Votre modèle Ingredient/Supplement
import { CartItem } from '../shared/models/order.model';

// Interface pour un article dans le panier (inchangée)


@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Utiliser un tableau privé pour stocker les items
  private items: CartItem[] = [];

  constructor() {
    // Charger le panier depuis localStorage au démarrage du service
    this.items = this.loadCartFromLocalStorage();
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('pizzeriaCart', JSON.stringify(this.items));
  }

  private loadCartFromLocalStorage(): CartItem[] {
    const cartData = localStorage.getItem('pizzeriaCart');
    return cartData ? JSON.parse(cartData) : [];
  }

  // Méthodes pour que les composants récupèrent les données du panier
  getCartItems(): CartItem[] {
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

  // Méthodes pour modifier le panier
  addItem(pizza: Pizza, quantity: number, addedSupplements: Ingredient[], removedIngredients: Ingredient[]): void {
    // const calculatedItemPrice = this.calculatePriceForPizzaConfiguration(pizza, addedSupplements);
    const newItem: CartItem = {
      tempId: crypto.randomUUID(),
      pizza: pizza,
      quantity: quantity,
      addedSupplements: [...addedSupplements],
      removedIngredients: [...removedIngredients],
      // calculatedItemPrice: calculatedItemPrice
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
    const itemIndex = this.items.findIndex(item => item.tempId === tempId);
    if (itemIndex > -1) {
      if (newQuantity > 0) {
        this.items[itemIndex].quantity = newQuantity;
      } else {
        this.items.splice(itemIndex, 1); // Supprimer l'item si quantité <= 0
      }
      this.saveCartToLocalStorage();
      // IMPORTANT: Notification manuelle nécessaire pour les composants.
    }
  }
 
  removeItem(tempId: string): void {
    this.items = this.items.filter(item => item.tempId !== tempId);
    this.saveCartToLocalStorage();
    // IMPORTANT: Notification manuelle nécessaire pour les composants.
  }

  clearCart(): void {
    this.items = [];
    this.saveCartToLocalStorage();
    // IMPORTANT: Notification manuelle nécessaire pour les composants.
  }
}