import { boolean, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'


export const subreddit = pgTable('subreddit',{
    id: serial('id').primaryKey(),
    created_at: timestamp().defaultNow(),
    topic: text()
})


export const post = pgTable('post',{
    id: serial('id').primaryKey(),
    created_at: timestamp().defaultNow(),
    title: text('title'),
    body: text('body'),
    image: text('image'),
    username: varchar('username'),
    subreddit_id: integer('subreddit_id').references(()=>subreddit.id)
})


export const comment = pgTable('comment',{
    id: serial('id').primaryKey(),
    created_at: timestamp().defaultNow(),
    post_id: integer().references(()=>post.id),
    text: text(),
    username: varchar()
});

export const vote = pgTable('vote',{
    id: serial('id').primaryKey(),
    created_at: timestamp().defaultNow(),
    post_id: integer().references(()=>post.id),
    upvote: boolean(),
    username: varchar()
});

