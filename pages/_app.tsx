import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import Header from '../components/Header'
import { ApolloProvider } from '@apollo/client'
import { client } from '../apollo-client'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return(
    <SessionProvider session={session} basePath="https://reddit-clone-omega-eight.vercel.app/api/auth">
    <ApolloProvider client={client}>
      <div className='h-screen overflow-y-scroll bg-slate-200'>
        <Toaster/>
        <Header/>
     <Component {...pageProps} />
     </div>
     </ApolloProvider>
     </SessionProvider>
  )
}

export default MyApp
