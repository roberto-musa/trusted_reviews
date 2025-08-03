// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const reviewsBackendSchema = {
  $id: 'ReviewsBackend',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'text'],
  properties: {
    id: { type: 'number' },
    text: { type: 'string' }
  }
}
export const reviewsBackendValidator = getValidator(reviewsBackendSchema, dataValidator)
export const reviewsBackendResolver = resolve({})

export const reviewsBackendExternalResolver = resolve({})

// Schema for creating new data
export const reviewsBackendDataSchema = {
  $id: 'ReviewsBackendData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...reviewsBackendSchema.properties
  }
}
export const reviewsBackendDataValidator = getValidator(reviewsBackendDataSchema, dataValidator)
export const reviewsBackendDataResolver = resolve({})

// Schema for updating existing data
export const reviewsBackendPatchSchema = {
  $id: 'ReviewsBackendPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...reviewsBackendSchema.properties
  }
}
export const reviewsBackendPatchValidator = getValidator(reviewsBackendPatchSchema, dataValidator)
export const reviewsBackendPatchResolver = resolve({})

// Schema for allowed query properties
export const reviewsBackendQuerySchema = {
  $id: 'ReviewsBackendQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(reviewsBackendSchema.properties)
  }
}
export const reviewsBackendQueryValidator = getValidator(reviewsBackendQuerySchema, queryValidator)
export const reviewsBackendQueryResolver = resolve({})
