# Użyj obrazu Node.js jako bazowego
FROM node:18

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj plik package.json i package-lock.json do kontenera
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj cały kod źródłowy do kontenera
COPY . .

# Zbuduj aplikację React
RUN npm run build

# Zainstaluj prosty serwer HTTP i przekaż zbudowaną aplikację
RUN npm install -g serve

# Uruchom aplikację na porcie 8000
CMD ["serve", "-s", "build", "-l", "8000"]

# Eksponuj port 8000
EXPOSE 8000
