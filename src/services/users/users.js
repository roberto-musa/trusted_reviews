// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

// --- INIZIO MODIFICA: Aggiungi queste importazioni ---
import { authenticate } from '@feathersjs/authentication'
import { hashPassword, protect } from '@feathersjs/authentication-local'
// --- FINE MODIFICA ---

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  usersDataValidator,
  usersPatchValidator,
  usersQueryValidator,
  usersResolver,
  usersExternalResolver,
  usersDataResolver,
  usersPatchResolver,
  usersQueryResolver
} from './users.schema.js'
import { UsersService, getOptions } from './users.class.js'
import { usersPath, usersMethods } from './users.shared.js'

export * from './users.class.js'
export * from './users.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const users = app => {
  // Register our service on the Feathers application
  app.use(usersPath, new UsersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: usersMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(usersPath).hooks({
    around: {
      // all: [schemaHooks.resolveExternal(usersExternalResolver), schemaHooks.resolveResult(usersResolver)]
      // --- INIZIO MODIFICA: Applica le regole di autenticazione ---
      all: [
        // NOTA: Manteniamo gli hooks esistenti e aggiungiamo i nostri
        schemaHooks.resolveExternal(usersExternalResolver), 
        schemaHooks.resolveResult(usersResolver)
      ],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [], // Lasciamo la creazione aperta per la registrazione
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')],
      update: [authenticate('jwt')] // Aggiungiamo anche update per sicurezza
      // --- FINE MODIFICA ---
    },
    before: {
      all: [schemaHooks.validateQuery(usersQueryValidator), schemaHooks.resolveQuery(usersQueryResolver)],
      find: [],
      get: [],
      create: [
        // --- INIZIO MODIFICA: Aggiungi l'hash della password ---
        hashPassword('password'),
        // --- FINE MODIFICA ---
        schemaHooks.validateData(usersDataValidator), 
        schemaHooks.resolveData(usersDataResolver)
      ],
      patch: [
        // --- INIZIO MODIFICA: Aggiungi l'hash della password anche qui (per il cambio password) ---
        hashPassword('password'),
        // --- FINE MODIFICA ---
        schemaHooks.validateData(usersPatchValidator), 
        schemaHooks.resolveData(usersPatchResolver)
      ],
      remove: []
    },
    after: {
      all: [
        // --- INIZIO MODIFICA: Proteggi la password in tutte le risposte ---
        protect('password')
        // --- FINE MODIFICA ---
      ]
    },
    error: {
      all: []
    }
  })
}
