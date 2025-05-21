isPizzaAvailable(pizza: Pizza): boolean {
  return pizza.baseIngredients.every(ingredient => ingredient.availableAsSupplement);
} 