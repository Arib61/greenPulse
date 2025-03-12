# Utiliser Node.js pour lancer le serveur de développement
FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de configuration
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install --frozen-lockfile

# Copier le reste des fichiers
COPY . .

# Exposer le port utilisé par Vite
EXPOSE 5173

# Démarrer l'application en mode développement
CMD ["npm", "run", "dev", "--", "--host"]
