export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export interface Task {
  id: string; // Identifiant unique
  title: string; // Titre de la tâche
  description: string; // Description détaillée
  status: TaskStatus; // Statut actuel
  priority: TaskPriority; // Niveau de priorité
  createdAt: Date; // Date de création
  updatedAt: Date; // Date de modification
  dueDate?: Date; // Date d'échéance (optionnelle)
  tags: string[]; // Tags associés
}