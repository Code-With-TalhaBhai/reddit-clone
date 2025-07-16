import { ApolloClient,InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
    // uri: 'https://48p1r2roz4.sse.codesandbox.io',
    // uri: 'https://public095fff4d7b479e37.stepzen.net/api/yucky-quetzal/__graphql',
    uri: 'http://localhost:3000/api/apollo',
    // headers:{
    //   Authorization: `Apikey ${process.env.STEPZEN_APIKEY}`
    // },
    cache: new InMemoryCache()
  });