### BACKEND

## Prérequis

# Docker
Téléchargez Docker : 
`https://www.docker.com/products/docker-desktop/`

# Maven
Téléchargez Maven : 
`https://maven.apache.org/download.cgi`

Téléchargez la Binary zip archive.

Ajouter Maven au Path

## Serveur de base de données PostgreSQL

Placez-vous à la racine du projet.
Exécuter la commande : 
`docker compose up -d` 

Pour désactiver le serveur :
`docker compose down`

## Compiler le Backend

Placez-vous à la racine du backend
`cd backend`

Exécuter la commande :
`mvn spring-boot:run`
