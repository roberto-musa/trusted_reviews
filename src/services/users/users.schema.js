// src/services/users/users.schema.js

import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Schema per i dati di un utente
export const usersSchema = Type.Object(
  {
    id: Type.Number(),
    email: Type.String(),
    // NON includere la password qui, perché non vogliamo mai che venga restituita
  },
  { $id: 'Users', additionalProperties: false }
)
export const usersValidator = getValidator(usersSchema, dataValidator)
export const usersResolver = resolve({})

// --- INIZIO DELLA MODIFICA ---

// Schema per i dati inviati durante la CREAZIONE di un utente
export const usersDataSchema = Type.Object(
  {
    email: Type.String({ format: 'email' }), // Richiede una stringa in formato email
    password: Type.String()                  // Richiede una stringa per la password
  },
  { $id: 'UsersData', additionalProperties: false }
)
// --- FINE DELLA MODIFICA ---

export const usersDataValidator = getValidator(usersDataSchema, dataValidator)
export const usersDataResolver = resolve({})


// Schema per i dati inviati durante l'AGGIORNAMENTO (patch)
export const usersPatchSchema = Type.Partial(usersDataSchema, {
  $id: 'UsersPatch'
})
export const usersPatchValidator = getValidator(usersPatchSchema, dataValidator)
export const usersPatchResolver = resolve({})


// Schema per le query (es. /users?email=test@example.com)
export const usersQueryProperties = Type.Pick(usersSchema, ['id', 'email'])
export const usersQuerySchema = Type.Intersect(
  [
    querySyntax(usersQueryProperties),
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const usersQueryValidator = getValidator(usersQuerySchema, queryValidator)
export const usersQueryResolver = resolve({})

/*
// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const usersSchema = {
  $id: 'Users',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'text'],
  properties: {
    id: { type: 'number' },
    text: { type: 'string' }
  }
}
export const usersValidator = getValidator(usersSchema, dataValidator)
export const usersResolver = resolve({})

export const usersExternalResolver = resolve({})

// Schema for creating new data
export const usersDataSchema = {
  $id: 'UsersData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...usersSchema.properties
  }
}
export const usersDataValidator = getValidator(usersDataSchema, dataValidator)
export const usersDataResolver = resolve({})

// Schema for updating existing data
export const usersPatchSchema = {
  $id: 'UsersPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...usersSchema.properties
  }
}
export const usersPatchValidator = getValidator(usersPatchSchema, dataValidator)
export const usersPatchResolver = resolve({})

// Schema for allowed query properties
export const usersQuerySchema = {
  $id: 'UsersQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(usersSchema.properties)
  }
}
export const usersQueryValidator = getValidator(usersQuerySchema, queryValidator)
export const usersQueryResolver = resolve({})
*/