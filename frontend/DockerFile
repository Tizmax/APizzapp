# Étape 1 : utiliser une image Node.js officielle avec npm
FROM node:20

# Définir le dossier de travail dans le conteneur
WORKDIR /app

# Copier uniquement les fichiers nécessaires à l'installation des dépendances
COPY package*.json ./

# Installer les dépendances (cela permet de mettre en cache npm install)
RUN npm install

# Copier le reste de l'application
COPY . .

# Exposer le port sur lequel Angular écoute
EXPOSE 4200

# Commande de démarrage avec hot reload (mode développement)
CMD ["npm", "run", "start"]
