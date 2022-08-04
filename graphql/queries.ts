import { gql } from '@apollo/client';


export const getSubredditByTopic = gql`
    query redditFind($topic: String!){
        getSubredditListByTopic(topic:$topic){
            id
            topic
            created_at
        }
    }
`

export const getAllPosts = gql`
    query AllPosts{
        getPostList{
        id
        title
        image
        subreddit_id
        body
        username
        created_at
        comments{
            id
            created_at
            post_id
            text
            username
        }
        subreddit{
            id
            topic
            created_at
        }
        votes{
            id
            created_at
            post_id
            upvote
            username
        }
    }
}

`


export const getSubRedditPosts = gql`
    query AllPostsReddit($topic:String!){
        getPostListByTopic(topic:$topic){
        id
        title
        image
        subreddit_id
        body
        username
        created_at
        comments{
            id
            created_at
            post_id
            text
            username
        }
        subreddit{
            id
            topic
            created_at
        }
        votes{
            id
            created_at
            post_id
            upvote
            username
        }
    }
}
`


export const getPostListByID = gql`
    query PostById($id:ID!){
        getPostListById(id:$id){
        id
        title
        image
        subreddit_id
        body
        username
        created_at
        comments{
            id
            created_at
            post_id
            text
            username
        }
        subreddit{
            id
            topic
            created_at
        }
        votes{
            id
            created_at
            post_id
            upvote
            username
        }
    }
}
`
export const getComments = gql`
    query getcommentlist{
        getCommentList{
            created_at
            id
            post_id
            text
            username
        }
    }   
`

export const GET_SUBREDDITLIST_BY_LIMIT = gql`
    query MyQuery($limit:Int!){
        getSubredditListByLimit(limit:$limit){
            created_at
            id
            topic
        }
    }
`

export const GET_VOTE_LIST_BY_ID = gql`
    query getvotelistbyId($id:ID!){
        getVoteListById(id:$id){
            id
            created_at
            post_id
            upvote
            username
        }
    }
`


export const GET_POSITIVE_VOTES = gql`
    query getUpvotes($post_id:ID!,$upvote:Boolean!){
        getPositiveVotes(post_id:$post_id,upvote:$upvote){
            created_at
            id
            post_id
            upvote
            username
        }
    }
`