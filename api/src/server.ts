import { GraphQLServer } from 'graphql-yoga'
import { context } from './config'
import resolvers from './resolvers'
import { importSchema } from 'graphql-import'
import { catchErrorsMiddleware } from './middlewares'
import { AuthDirective } from './directives'

const server = new GraphQLServer({
  typeDefs: importSchema(`${__dirname}/schemas/Schema.graphql`),
  resolvers,
  context,
  middlewares: [catchErrorsMiddleware],
  schemaDirectives: {
    auth: AuthDirective,
  },
})

export default server
