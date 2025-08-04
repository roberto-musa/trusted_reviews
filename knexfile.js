// knexfile.js

// Carica la configurazione delle variabili d'ambiente (importante all'inizio)
require('dotenv').config();

// Importa l'applicazione Feathers
const { app } = require('./src/app');

// Ottieni la configurazione del database DOPO che l'app è stata caricata
// Il metodo app.get() restituisce la configurazione "risolta"
const dbConfig = app.get('mysql');

// Esporta la configurazione per i vari ambienti di Knex
module.exports = {
  development: dbConfig,
  test: dbConfig,
  production: dbConfig
};

/* OLD FILE
// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import { app } from './src/app.js'

// Load our database connection info from the app configuration
const config = app.get('mysql')

export default config
*/