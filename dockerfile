FROM node:18
#docker run -p 8080 
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install -g @angular/cli
RUN npm install
RUN echo $PATH
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]