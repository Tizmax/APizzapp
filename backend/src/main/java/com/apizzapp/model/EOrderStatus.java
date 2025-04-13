package com.apizzapp.model;

public enum EOrderStatus {
    PENDING,          // En attente de confirmation/paiement
    PAID,             // Payée
    PREPARING,        // En cours de préparation
    READY_FOR_PICKUP, // Prête à être récupérée
    CANCELLED         // Annulée
}