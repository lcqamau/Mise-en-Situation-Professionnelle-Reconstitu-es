☕ Paye Tonkawa - Solution B2B (MSPR TPRE814)
📌 Présentation du Projet

Paye Tonkawa est une entreprise spécialisée dans la vente de café. Ce projet, réalisé dans le cadre de la MSPR TPRE814 à l'EPSI, 
vise à moderniser le système d'information existant pour répondre aux nouveaux besoins B2B (vente aux professionnels de la restauration).

L'objectif principal est de migrer d'une architecture monolithique limitée vers une architecture en micro-services agile, scalable et sécurisée.

🚀 Objectifs de la Mission

Modernisation : Passage d'un ERP/CRM vieillissant vers une architecture distribuée.
Scalabilité : Découpage du métier en micro-services indépendants (Clients, Produits, Commandes).
Fiabilité : Mise en place d'une communication robuste entre services via un Message Broker.
Automatisation : Intégration et déploiement continus (CI/CD).

🛠 Stack Technique
Backend : Node.js avec le framework Express.js.

Frontend : React.js pour l'interface de gestion.

Base de données : PostgreSQL (une instance par micro-service pour garantir l'indépendance).

Communication Inter-services : RabbitMQ (Message Broker).

Tests : Jest pour les tests unitaires et d'intégration.

Conteneurisation : Docker & Docker Compose.

🏗 Architecture du Système
La solution est décomposée en trois services principaux :

Service Clients : Gestion du référentiel des établissements (SIRET, contacts, adresses).

Service Produits : Gestion du catalogue de café et mise à jour des stocks en temps réel.

Service Commandes : Tunnel d'achat, historique et suivi des statuts d'expédition.

🔧 Installation et Lancement (Développement)
Cloner le dépôt :

Bash
git clone https://github.com/votre-repo/paye-ton-kawa.git
cd paye-ton-kawa
Lancer les services avec Docker :

Bash
docker-compose up --build
Accéder aux interfaces :

Frontend : http://localhost:3000

API Gateway / Services : http://localhost:8080 (selon configuration)

📈 Pipeline CI/CD
Le projet intègre des GitHub Actions pour assurer la qualité du code à chaque commit :

Vérification du Linting.

Exécution des tests automatisés (Jest).

Build des images Docker.
