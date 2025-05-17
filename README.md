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

IMPORTANT : Pour détruire les volumes existant en cas de modificationde la db:
`docker compose down -v`

# Exécuter des commandes dans un container

Pour exécuter une commande à l'interieur d'une container utiliser la commande suivante : 
`docker compose exec <nom_du_container> <commande>`

Pour exécuter une commande angular : 
`docker compose exec frontend npx ng ...`

Par exemple : 
`docker compose exec frontend npx ng generate service services/pizza`

Pour visualiser la base de données :
`docker compose exec db  psql -U Tizmax -d apizzetta-db`
Puis : 
\dt             -- Liste les tables
\d nom_table    -- Détail d'une table
SELECT * FROM nom_table ;

Pour supprimer une table : 
DELETE FROM nom_table ;

