# Étape 1: Utiliser Maven pour builder l'application
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . . 
RUN mvn clean package -DskipTests

# Étape 2: Utiliser une image plus légère avec Java + Python
FROM eclipse-temurin:21-jdk
WORKDIR /app

# 📌 Mettre à jour et installer Python + pip
RUN apt-get update && apt-get install -y python3 python3-pip && ln -s /usr/bin/python3 /usr/bin/python

# Vérifier l'installation de Python et pip
RUN python --version && pip --version

# Copier les dépendances Python et les installer globalement
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --break-system-packages -r /app/requirements.txt

COPY src/main/java/greenpulse/ecocrops/ecocrops/python/chat.py /app/chat_bot.py

# Copier l'application compilée
COPY --from=build /app/target/*.jar app.jar

# Exposer le port de l'application
EXPOSE 8080

# Lancer l'application Spring Boot
CMD ["java", "-jar", "app.jar"]
