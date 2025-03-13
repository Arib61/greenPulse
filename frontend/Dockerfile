# Utiliser Node.js pour lancer le serveur de développement
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install --frozen-lockfile

# Copier le reste des fichiers du projet
COPY . .

# Exposer le port utilisé par Vite
EXPOSE 5173

# Démarrer l'application en mode développement avec accès réseau
CMD ["npm", "run", "dev", "--", "--host"]
