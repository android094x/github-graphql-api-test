import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/client'

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
    },
  }))

  return forward(operation)
})

const client: ApolloClient<object> = new ApolloClient({
  connectToDevTools: true,
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
})

export { client }
