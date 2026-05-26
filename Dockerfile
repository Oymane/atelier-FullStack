FROM node:20-alpine AS frontend
WORKDIR /app
COPY src/main/webapp/reactjs/package*.json ./
RUN npm ci --silent
COPY src/main/webapp/reactjs/src ./src
COPY src/main/webapp/reactjs/public ./public
RUN npm run build

FROM gradle:jdk21-alpine AS builder
WORKDIR /app
COPY build.gradle settings.gradle .
RUN gradle dependencies --no-daemon
COPY src src
COPY --from=frontend /app/build src/main/resources/static
RUN gradle build -x test --no-daemon

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]
