import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import Header from '../components/Header'
import { ApolloProvider } from '@apollo/client'
import { client } from '../apollo-client'
import { Toaster } from 'react-hot-toast'
import { Session } from 'next-auth'



// function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
function MyApp({ Component, pageProps }: AppProps & { pageProps: { session: Session | null } }) {
  const basePath = process.env.NODE_ENV === 'production' 
    ? 'https://reddit-clone-omega-eight.vercel.app/api/auth' 
    : '/api/auth';

  return(
    <SessionProvider session={pageProps.session} basePath={basePath}>
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
