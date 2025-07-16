import { ApolloClient,InMemoryCache} from "@apollo/client";

const basePath = process.env.NODE_ENV === 'production' 
    ? 'https://reddit-clone-omega-eight.vercel.app' 
    : 'http://localhost:3000';

export const client = new ApolloClient({
    uri: `${basePath}/api/apollo`,
    cache: new InMemoryCache()
  });