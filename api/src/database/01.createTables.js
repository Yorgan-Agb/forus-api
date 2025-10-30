import { sequelize } from '../models/associations.js';

console.log('🗑️ Suppression des tables existantes...');
await sequelize.drop();

console.log('🚧 Définition des tables...');
await sequelize.sync();

console.log(
  '🗃️ Structure de la base de données : ',
  await sequelize.getQueryInterface().showAllTables()
);

console.log('✅ Opération terminée avec succès.');
await sequelize.close();
