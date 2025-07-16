import { ApolloServer } from "apollo-server-micro";
import { resolvers } from "./../../graphql_backened/resolvers";
import { typeDefs } from "./../../graphql_backened/schema";
import Cors from 'micro-cors';

const cors = Cors();

const server = new ApolloServer({typeDefs,resolvers,introspection:true,formatError: (error) => {
    console.error('GraphQL Error:', error);
    return error;
  },});

const startServer = server.start();

export default cors(async function handler(req:any,res:any){
    if(req.method === 'OPTIONS'){
        res.end();
        return false;
    }
    await startServer

    await server.createHandler({
        path: '/api/apollo'
    })(req,res);
});

export const config = {
    api:{
        bodyParser: false,
    }
}