Paye Tonkawa - Solution B2B
📌 Présentation du Projet
Dans le cadre de la MSPR TPRE814 à l'EPSI, ce projet vise à moderniser le système d'information de l'entreprise fictive Paye Tonkawa, spécialisée dans la vente de café. L'objectif est de permettre une transition efficace vers la vente B2B pour les professionnels de la restauration grâce à une architecture logicielle moderne, modulaire et scalable.
+2

🚀 Objectifs de la Mission

Modernisation : Migration d'un système existant vers une architecture en micro-services.


Développement API : Création de trois services indépendants (Clients, Produits, Commandes) exposant des APIs REST sécurisées.
+2


Interface Web : Développement d'une application React pour consommer les APIs et faciliter les tests.
+1


Automatisation : Mise en place d'une pipeline CI/CD complète avec GitHub Actions.
+1

🛠 Stack Technique

Backend : Node.js avec le framework Express.js.


Frontend : React.js (intégré via Axios/fetch).
+1


Base de données : PostgreSQL (avec séparation des bases par service).
+1


Communication : Message Broker RabbitMQ pour la synchronisation des données.


Conteneurisation : Docker pour le déploiement des services.


Tests & Qualité : Jest pour les tests unitaires et d'intégration, suivi de la qualité via Linting et normes OWASP.
+1

🏗 Architecture des Micro-services
La solution est découpée en trois micro-services autonomes:
+1


API Clients : Gestion du référentiel client.


API Produits : Gestion du catalogue de café et des stocks.


API Commandes : Tunnel de commande et suivi du statut d'envoi.

⚙️ CI/CD et Déploiement
Le projet utilise GitHub Actions pour automatiser le cycle de vie du logiciel:


Pipelines : Build, tests automatisés et déploiement continu.


Workflow : Utilisation de la méthodologie GitFlow pour la gestion des branches.
