import { and, eq, ilike } from "drizzle-orm"
import { db } from "../drizzle_schema/client"
import { comment, post , subreddit, vote } from "../drizzle_schema/schema"



export const resolvers = {
    Query: {
        getPostList: async()=>{
            let posts = await db.select().from(post).leftJoin(subreddit,eq(subreddit.id,post.subreddit_id))
            if (posts.length > 0){
            let transformed_posts = posts.map(async({post,subreddit})=>{
            const post_comments : any[] = await db.select().from(comment).where(eq(comment.post_id,post.id))
            const post_upvotes : any[] = await db.select().from(vote).where(eq(vote.post_id,post.id))
            return {
                ...post,subreddit,comments: post_comments, votes: post_upvotes
            }})
            return transformed_posts.reverse()
            }
            return []
        },
        getSubredditListByTopic: async(_:any, {topic}:{topic:string})=>{
            const subreddit_by_topic = await db.select().from(subreddit).where(ilike(subreddit.topic,topic))
            return subreddit_by_topic[0]
        },
        getPostListByTopic: async(_:any, {topic}:{topic:string})=>{
            const subreddit_by_topic = await db.select().from(subreddit).where(ilike(subreddit.topic,topic))
            if (subreddit_by_topic.length > 0){
                let posts = await db.select().from(post).where(eq(post.subreddit_id,subreddit_by_topic[0].id)).leftJoin(subreddit,eq(subreddit.id,post.subreddit_id))
                let transformed_posts = posts.map(async({post,subreddit})=>{
                const post_comments : any[] = await db.select().from(comment).where(eq(comment.post_id,post.id))
                const post_upvotes : any[] = await db.select().from(vote).where(eq(vote.post_id,post.id))
                return {
                    ...post,subreddit,comments: post_comments, votes: post_upvotes
                }})
                return transformed_posts
            }
            return []
        },
        getPostListById: async(_:any, {id}:{id: string})=>{
            const post_by_id : any[] = await db.select().from(post).where(eq(post.id,Number(id))).leftJoin(subreddit,eq(subreddit.id,post.subreddit_id))
            if(post_by_id.length > 0){
                const response = post_by_id[0].post
                const post_comments : any[] = await db.select().from(comment).where(eq(response.id,comment.post_id))
                const post_upvotes : any[] = await db.select().from(vote).where(eq(response.id,vote.post_id))
                response['subreddit'] = post_by_id[0].subreddit
                response['comments'] = post_comments
                response['votes'] = post_upvotes
                return response
            }
            return null
        },
        getCommentList: async()=>{
            const comment_list = await db.select().from(comment)
            return comment_list
        },
        getSubredditListByLimit: async(_:any,{limit}:{limit:number})=>{
            const list_by_limit = await db.select().from(subreddit).limit(limit)
            return list_by_limit
        },
        getVoteListById: async(_:any,{id}:{id: string | number})=>{
            const vote_by_id = await db.select().from(vote).where(eq(vote.id,Number(id)))
            return vote_by_id[0]
        },
        getPositiveVotes: async(_:any,{post_id,upvote}:{post_id: string | number, upvote: boolean})=>{
            const positive_votes = await db.select().from(vote).where(and(eq(vote.post_id,Number(post_id)),eq(vote.upvote,upvote)))
            return positive_votes
        }
    },
    Mutation:{
        insertPost: async(_:any,{title,image,body,username,subreddit_id}:{title:string, image:string | null, body:string, username: string, subreddit_id:string})=>{
            const insert_post = await db.insert(post).values({title,image,body,username,subreddit_id:Number(subreddit_id)}).returning({title:post.title,image:post.image,subreddit_id:post.subreddit_id,username:post.username,body:post.body})
            return insert_post[0]
        },
        insertSubReddit: async(_:any,{topic}:{topic:string})=>{
            const insert_subreddit = await db.insert(subreddit).values({topic}).returning({id:subreddit.id,created_at:subreddit.created_at,topic:subreddit.created_at})
            return insert_subreddit[0]
        },
        insertComment: async(_:any,{post_id,text,username}:{post_id:string | number, text:string, username:string})=>{
            const insert_comment = await db.insert(comment).values({post_id:Number(post_id),text,username}).returning({id:comment.id,post_id:comment.post_id,created_at:comment.created_at,text:comment.text,username:comment.username})
            return insert_comment[0]
        },
        insertVote: async(_:any,{post_id,upvote,username}:{post_id:string | number, upvote: boolean, username:string})=>{
            const insert_vote = await db.insert(vote).values({post_id:Number(post_id),upvote,username}).returning({id:vote.id,upvote:vote.upvote,username:vote.username,post_id:vote.post_id,created_at:vote.created_at})
            return insert_vote[0]
        }
    }
}