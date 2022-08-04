export type PostTyping = {
    id: number
    title: string
    body: string
    image: string
    username: string
    created_at: string
    subreddit_id: number
    comments: comments[]
    subreddit: subreddit[]
    votes: votes[]
}

interface comments {
    id: number
    created_at: string
    post_id: number
    text: string
    username: string
}

interface subreddit {
    created_at: string
    topic: string
    id: number
}

interface votes {
     id: number
     created_at: string
     post_id: number
     upvote: boolean
     username: string
}