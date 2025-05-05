# Prérequis

Téléchargez Docker : 
`https://www.docker.com/products/docker-desktop/`

# Build & Run 

L'entièreté de l'application est dockerisé, il faudra avoir docker desktop ouvert pour pouvoir exécuter toutes les commandes suivantes.

Pour lancer l'application (c'est à dire : build le backend, générer les tables de la base de donnée et lancer le serveur de développement angular).
Placez-vous à la racine du projet et exécutez la commande suivante : 

`docker compose up --build`

Angular prendra en compte les modifications faites au niveau du front automatiquement toutes les 5s sans avoir à rebuild l'application.
Pour tout changement au niveau du backend ou de la base de données il est nécessaire de rebuild l'application avec la commande ci-dessus.

La commande suivante permet de lancer l'application sans la rebuild (lancer le serveur de bdd et le serveur de dev angular avec le dernier build du back donc sans tenir compte des modifs back et bdd) 
`docker compose up`

Enfin pour shutdown l'application il suffit de lancer : 
`docker compose down`