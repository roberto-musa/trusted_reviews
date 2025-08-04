import { users } from './users/users.js'
import { reviewsBackend } from './reviews-backend/reviews-backend.js'
// import { user } from './users/users.js'
export const services = app => {
  app.configure(users)

  app.configure(reviewsBackend)

//  app.configure(user)

  // All services will be registered here
}
