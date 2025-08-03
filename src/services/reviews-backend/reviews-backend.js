// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  reviewsBackendDataValidator,
  reviewsBackendPatchValidator,
  reviewsBackendQueryValidator,
  reviewsBackendResolver,
  reviewsBackendExternalResolver,
  reviewsBackendDataResolver,
  reviewsBackendPatchResolver,
  reviewsBackendQueryResolver
} from './reviews-backend.schema.js'
import { ReviewsBackendService, getOptions } from './reviews-backend.class.js'
import { reviewsBackendPath, reviewsBackendMethods } from './reviews-backend.shared.js'

export * from './reviews-backend.class.js'
export * from './reviews-backend.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const reviewsBackend = app => {
  // Register our service on the Feathers application
  app.use(reviewsBackendPath, new ReviewsBackendService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: reviewsBackendMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(reviewsBackendPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(reviewsBackendExternalResolver),
        schemaHooks.resolveResult(reviewsBackendResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(reviewsBackendQueryValidator),
        schemaHooks.resolveQuery(reviewsBackendQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(reviewsBackendDataValidator),
        schemaHooks.resolveData(reviewsBackendDataResolver)
      ],
      patch: [
        schemaHooks.validateData(reviewsBackendPatchValidator),
        schemaHooks.resolveData(reviewsBackendPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
