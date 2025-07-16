import React from 'react'
import { getAllPosts, getSubRedditPosts } from './../graphql/queries'
import { useQuery } from '@apollo/client'
import {PostTyping} from '../typings/typings'
import { SuperBalls } from '@uiball/loaders'
import Post from './subcomponents/Post'

type Props = {
  topic?: string;
}

function Feed({topic}: Props) {

  const {loading,error,data} = useQuery( !topic ? getAllPosts : getSubRedditPosts,{
    variables:{
      topic: topic?.includes('%20')?topic.replace('%20',' '): topic
    }
  });

  if(loading)
  return (
    <div className='absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4'>
        <SuperBalls 
         size={95}
         speed={2.4} 
         color="#FF4501" 
        />
      </div>
  )

  const AllPosts:PostTyping[] = topic ? data.getPostListByTopic : data.getPostList;
  return ( 
    <div className='flex-1 mt-5 space-y-5'>
    {
      AllPosts?.map((post:PostTyping,index:number)=>(
        <Post key={index} post={post} />
    ))
  }
  </div>
  )
}

export default Feed