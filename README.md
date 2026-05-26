# SpringDataRest — Atelier FullStack
Fait par : Aymane Boughaleb

Application Spring Boot avec React, MySQL, Docker et Kubernetes (Minikube).

## Stack technique

- **Backend** : Spring Boot 3.4.5, Spring Data REST, Spring Security
- **Frontend** : React (servi par Spring Boot)
- **Base de données** : MySQL 8.0
- **Conteneurisation** : Docker (multi-stage build)
- **Orchestration** : Kubernetes / Minikube

---

## Démarrage rapide avec Docker Compose

### Prérequis
- Docker Desktop installé et lancé

### Lancer l'application
```bash
docker-compose up --build
```

L'application est accessible à : **http://localhost:8080**

### Arrêter l'application
```bash
docker-compose down
```

---

## Déploiement Kubernetes (Minikube)

### Prérequis
- Docker Desktop
- Minikube
- kubectl

### Étapes

**1. Démarrer Minikube**
```bash
minikube start
```

**2. Builder l'image dans le contexte Minikube**
```bash
eval $(minikube docker-env)
docker build -t springboot-app:1.0 .
```

**3. Appliquer ConfigMap et Secrets**
```bash
kubectl apply -f k8s/mysql-configMap.yaml
kubectl apply -f k8s/mysql-secrets.yaml
```

**4. Déployer MySQL**
```bash
kubectl apply -f k8s/db-deployment.yaml
kubectl get pods
```

**5. Déployer Spring Boot**
```bash
kubectl apply -f k8s/app-deployment.yaml
kubectl get pods
kubectl get svc
```

**6. Accéder à l'application**
```bash
minikube service springboot-crud-svc --url
```

**7. Dashboard Kubernetes**
```bash
minikube dashboard
```

**8. Arrêter Minikube**
```bash
minikube stop
```

---

## Architecture Kubernetes

```
Node (Minikube)
├── Pod MySQL (1 replica)
│   └── mysql:8.0
│       └── PersistentVolume (1Gi)
│
└── Pod Spring Boot (3 replicas)
    └── springboot-app:1.0
```

---

## Ce qui a été réalisé

- Déploiement de MySQL avec PersistentVolume dans Kubernetes
- Déploiement de Spring Boot avec 3 replicas
- Connexion des deux pods via un Service Kubernetes
- Utilisation de ConfigMap et Secrets pour la configuration
- Exposition de l'application via NodePort

---

## Structure du projet

```
├── src/
│   ├── main/
│   │   ├── java/          # Code Spring Boot
│   │   ├── resources/     # application.properties + static React build
│   │   └── webapp/reactjs # Sources React
├── k8s/
│   ├── db-deployment.yaml      # MySQL : PVC + Deployment + Service
│   ├── app-deployment.yaml     # Spring Boot : Deployment + Service
│   ├── mysql-configMap.yaml    # ConfigMap (host, dbName)
│   └── mysql-secrets.yaml      # Secrets (username, password)
├── Dockerfile                  # Multi-stage : Node + Gradle + JRE
├── compose.yaml                # Docker Compose
└── README.md
```
