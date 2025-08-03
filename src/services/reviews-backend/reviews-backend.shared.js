export const reviewsBackendPath = 'reviews-backend'

export const reviewsBackendMethods = ['find', 'get', 'create', 'patch', 'remove']

export const reviewsBackendClient = client => {
  const connection = client.get('connection')

  client.use(reviewsBackendPath, connection.service(reviewsBackendPath), {
    methods: reviewsBackendMethods
  })
}
