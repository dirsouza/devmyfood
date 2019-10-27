import { GraphQLServer } from 'graphql-yoga'
import { models } from './models'
import resolvers from './resolvers'
import { importSchema } from 'graphql-import'
import { catchErrorsMiddleware } from './middlewares'

const server = new GraphQLServer({
  typeDefs: importSchema(`${__dirname}/schemas/Schema.graphql`),
  resolvers,
  context: { models },
  middlewares: [catchErrorsMiddleware],
})

export default server
