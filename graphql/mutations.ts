import { gql } from "@apollo/client";

export const ADD_POST = gql`
    mutation ADD_POST(
        $title: String!
        $image: String
        $subreddit_id: String!
        $body: String!
        $username: String! 
    ){
        insertPost(
            title: $title
            image: $image
            subreddit_id: $subreddit_id
            body: $body
            username: $username
        ){
            title
            image
            subreddit_id
            body
            username
            created_at
        }
    }
`


export const ADD_SUBREDDIT = gql`
    mutation($topic:String!){
        insertSubReddit(topic:$topic){
            id
            topic
            created_at
        }
    }
`

export const ADD_COMMENT = gql`
    mutation myMutation( 
    $post_id: String!
    $text: String!
    $username: String!
    ){
        insertComment(
          post_id: $post_id
          text: $text
          username: $username
        ){
            created_at
            id
            post_id
            text
            username
        }
    }
`

export const ADD_VOTE = gql`
    mutation Vote_Mutation(
        $post_id: String!
        $upvote: Boolean!
        $username: String!
    ){
      insertVote(post_id: $post_id, upvote: $upvote, username: $username){
      created_at
      id
      post_id
      upvote
      username
    }
    }
`