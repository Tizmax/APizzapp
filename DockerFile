# Étape 1 : Utiliser l'image Maven pour builder l'application
FROM maven AS build

# Répertoire de travail
WORKDIR /app

# Copier le fichier pom.xml et le répertoire src pour éviter de recopier tout à chaque fois
COPY backend/pom.xml .
COPY backend/src ./src

# Lancer la commande de build Maven
RUN mvn clean package -DskipTests

# Étape 2 : Utiliser l'image JDK pour exécuter l'application
FROM openjdk:17-jdk-slim

# Répertoire de travail
WORKDIR /app

# Copier le fichier JAR généré à partir de l'étape précédente
COPY --from=build /app/target/backend-0.1.0.jar app.jar

# Exposer le port sur lequel l'application Spring Boot va écouter
EXPOSE 8080

# Commande pour exécuter l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
