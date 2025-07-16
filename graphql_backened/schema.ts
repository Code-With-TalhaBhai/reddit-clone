import { gql } from "apollo-server-micro";



export const typeDefs = gql`

type SubReddit {
    id: String
    topic: String
    created_at: String
}

type Vote {
    id: String
    created_at: String
    post_id: String!
    upvote: Boolean
    username: String
}

type Comment {
    id: String
    created_at: String
    post_id: String!
    text: String
    username: String!
}

type Post {
    id: String
    title: String
    image: String
    subreddit_id: String!
    body: String
    username: String
    created_at: String
    comments: [Comment]
    subreddit: SubReddit
    votes: [Vote]
}






type Query {
    getPostList: [Post]
    getSubredditListByTopic(topic: String!): SubReddit
    getPostListByTopic(topic: String!): [Post]
    getPostListById(id: ID!): Post
    getCommentList: [Comment]
    getSubredditListByLimit(limit: Int!): [SubReddit]
    getVoteListById(id: ID!): Vote
    getPositiveVotes(post_id:ID!, upvote: Boolean!): [Vote]
}

type Mutation { 
    insertPost(title: String!, image: String, subreddit_id: String!, body: String!, username: String!): Post
    insertSubReddit(topic: String!): SubReddit
    insertComment(post_id: String!, text: String!, username: String!): Comment
    insertVote(post_id: String!, upvote: Boolean!, username: String!): Vote
    }
`