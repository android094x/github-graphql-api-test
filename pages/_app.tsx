import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '../lib/graphql/client'

import '../styles/globals.css'
import Layout from '../components/layout'

interface CustomAppProps {
  Component: AppProps['Component'] & {
    authenticationPage: boolean
  }
  pageProps: AppProps['pageProps']
}

const MyApp = ({ Component, pageProps }: CustomAppProps) => {
  return (
    <ApolloProvider client={client}>
      {Component.authenticationPage ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ApolloProvider>
  )
}

export default MyApp
