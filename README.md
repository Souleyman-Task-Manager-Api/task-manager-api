# 📋 Task Manager API

![NestJS](https://img.shields.io/badge/NestJS-10.0-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/License-ISC-green)

API REST complète pour la gestion de tâches, construite avec **NestJS**, **TypeScript** et **Swagger**.

---

## 🚀 Installation

\`\`\`bash
# Cloner le projet
git clone https://github.com/Souleyman/task-manager-api.git
cd task-manager-api

# Installer les dépendances
npm install

# Démarrer l'application
npm run start:dev
\`\`\`

L'API sera disponible sur : `http://localhost:3000`

---

## 📚 Documentation Swagger

Après démarrage, ouvrez : [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🔧 Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/tasks` | Liste toutes les tâches |
| GET | `/tasks/:id` | Détail d'une tâche |
| POST | `/tasks` | Crée une nouvelle tâche |
| PUT | `/tasks/:id` | Met à jour une tâche |
| PUT | `/tasks/:id/complete` | Marque une tâche comme terminée |
| DELETE | `/tasks/:id` | Supprime une tâche |
| GET | `/tasks/stats` | Statistiques des tâches |
| GET | `/tasks/overdue` | Tâches en retard |
| GET | `/tasks/priority/:priority` | Tâches par priorité |
| GET | `/tasks/status/:status` | Tâches par statut |

---

## 📁 Structure du projet

\`\`\`
src/
├── models/           # Entités et DTOs
│   ├── dto/          # Data Transfer Objects
│   └── task.model.ts # Modèle Task
├── tasks/            # Module Tasks
│   ├── tasks.controller.ts
│   ├── tasks.module.ts
│   └── tasks.service.ts
├── app.module.ts     # Module racine
└── main.ts           # Point d'entrée
\`\`\`

---

## 🛠️ Technologies utilisées

- [NestJS](https://nestjs.com/) - Framework Node.js progressif
- [TypeScript](https://www.typescriptlang.org/) - JavaScript typé
- [Swagger](https://swagger.io/) - Documentation API
- [Class-validator](https://github.com/typestack/class-validator) - Validation des données

---

## 📝 Exemple de requête

### Créer une tâche

\`\`\`bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Apprendre TypeScript",
    "description": "Terminer le cours",
    "priority": "HIGH",
    "tags": ["formation", "typescript"]
  }'
\`\`\`

### Réponse

\`\`\`json
{
  "id": "TASK-1234567890-1",
  "title": "Apprendre TypeScript",
  "description": "Terminer le cours",
  "status": "PENDING",
  "priority": "HIGH",
  "createdAt": "2025-03-26T10:00:00.000Z",
  "updatedAt": "2025-03-26T10:00:00.000Z",
  "tags": ["formation", "typescript"]
}
\`\`\`

---

## 👨‍💻 Auteur

**Souleyman**

- GitHub: [@Souleyman](https://github.com/Souleyman)

---

## 📄 Licence

ISC