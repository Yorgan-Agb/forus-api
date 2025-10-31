<div align="center">

# 🧩 Forus API

### _Plateforme de publication & gestion de contenu_

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

</div>

---

## 🚀 Aperçu

**Forus API** est une API RESTful développée avec **Node.js** et **Express**, servant de backend au projet **Forus** — une plateforme de publication et de gestion de contenu.

L'API permet de gérer :
- Les **utilisateurs**
- Les **posts**
- Les **catégories**
- Les **commentaires**

---

## ⚙️ Technologies et Outils

| Domaine | Technologies |
|----------|---------------|
| **Backend** | Node.js, Express |
| **Base de données** | PostgreSQL (via Sequelize ORM) |
| **Validation des données** | Joi |
| **Authentification** | Auth0 (middleware custom) |
| **Qualité du code** | ESLint, Prettier |
| **Conteneurisation** | Docker & Docker Compose |
| **Tests manuels** | REST Client / HTTP requests |
| **Gestion de projet** | Git & GitHub |

---

## 🧰 Installation & Utilisation

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/Yorgan-Agb/forus-api.git
cd forus-api
```

### 2️⃣ Installer les dépendances
```bash
npm install
```

### 3️⃣ Configurer l'environnement

Crée un fichier `.env` à la racine du projet à partir du modèle :
```bash
cp .env.example .env
```

Puis remplis les variables nécessaires :
```env
DATABASE_URL=postgres://user:password@localhost:5432/forus
AUTH_ISSUER_BASE_URL=
AUTH_CLIENT_ID=
AUTH_CLIENT_SECRET=
MANAGEMENT_API_AUDIENCE=
```

### 4️⃣ Lancer l'application

Mode développement :
```bash
npm run dev
```

Mode production :
```bash
npm start
```

---

📘 La documentation complète des routes sera disponible prochainement.

---

## 👨‍💻 Auteur

**Yorgan Agb** 💻  
Développeur Web Junior

- 🌐 [GitHub](https://github.com/Yorgan-Agb)
- 🧠 En formation

---

## 🧠 Remarque

Ce projet est actuellement en cours de développement. Il sert à la fois de support d'apprentissage et de base pour un futur projet complet (API + Front).

Le front-end sera développé dans une seconde phase du projet.
