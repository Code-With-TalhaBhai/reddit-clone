import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import PostBox from '../components/PostBox'
import SubredditRow from '../components/subcomponents/SubredditRow'
import { GET_SUBREDDITLIST_BY_LIMIT } from '../graphql/queries'
import { subreddit } from '../typings/typings'

const Home: NextPage = () => {
  const {data} = useQuery(GET_SUBREDDITLIST_BY_LIMIT,{
    variables:{
      limit: 10
    }
  });

  const subreddits : subreddit[] = data?.getSubredditListByLimit;

  return (
      <div className='my-7 max-w-5xl m-auto'>
      <Head>
        <title>Reddit Clone 2.0</title>
        <meta name="description" content="Subreddit 2.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostBox/>
      <div className='flex'>
      <Feed/>
      <div className="sticky top-36 ml-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
        <p className='text-md mb-1 p-4 pb-3 font-bold'>Top Communities</p>
        <div>
          {subreddits?.map((subreddit,i)=>(
            <SubredditRow key={subreddit.id}
            topic={subreddit.topic}
            index={i}
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Home
