import { GiftIcon,ChatAltIcon, BookmarkIcon, DotsHorizontalIcon, ShareIcon } from '@heroicons/react/outline';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid'
import Link from 'next/link';
import React from 'react';
import TimeAgo from 'react-timeago'
import { SuperBalls } from '@uiball/loaders'
import { PostTyping, votes } from '../../typings/typings'
import Avatar from './Avatar'
import { useMutation, useQuery } from '@apollo/client';
import { GET_POSITIVE_VOTES, GET_VOTE_LIST_BY_ID } from '../../graphql/queries';
import { ADD_VOTE } from '../../graphql/mutations';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

type Props = {
    post: PostTyping
}

const Post = ({post}: Props) => {
  
  if(!post)
  return (
    <div className='absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4'>
        <SuperBalls 
         size={45}
         speed={2.4} 
         color="#FF4501" 
         />
      </div>
  )
  const {data:session} = useSession();

  const {data:AllVotes} = useQuery(GET_VOTE_LIST_BY_ID,{
    variables:{
      id: post.id
    }
  });
  const voteList: votes[] = AllVotes?.getVoteListById;
  

  const [Add_Votes] = useMutation(ADD_VOTE
    ,{
    refetchQueries:[
      {query: GET_VOTE_LIST_BY_ID},
      'getvotelistbyId'
    ]
  }
  );



  const {data:UpVotes} = useQuery(GET_POSITIVE_VOTES,{
    variables:{
      post_id: post.id,
      upvote: true
    }
  });
  
  const upVoteList: votes[] = UpVotes?.getPositiveVotes;
  console.log(upVoteList);

  const {data:DownVotes} = useQuery(GET_POSITIVE_VOTES,{
    variables:{
      post_id: post.id,
      upvote: false
    }
  });
  const downVoteList: votes[] = DownVotes?.getPositiveVotes;


  const finalVotes: number = upVoteList?.length - downVoteList?.length;
  console.log(finalVotes);

  const voteFunctionality = (param:boolean)=>{
    if(session){
        Add_Votes({
          variables:{
            post_id: post.id,
            upvote: param,
            username: session?.user?.name
          }
        })
        toast.success('Vote Added');
    }else{
      toast.error('You need to SignIn to perform this activity');
    }
  }

  return (
    <Link href={`/post/${post.id}`}>
    <div className='flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:sm hover:border-gray-600'>
        {/* Votes */}
        <div className='flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400'>
            <ArrowUpIcon onClick={()=>voteFunctionality(true)} className='voteBtn hover:text-red-400'/>
            <p className='text-xs font-bold text-black'>{finalVotes}</p>
            <ArrowDownIcon onClick={()=>voteFunctionality(false)} className='voteBtn hover:text-blue-400'/>
        </div>

        {/* Header */}
        <div className="p-3 pb-1">
          <div className='flex items-center space-x-2'>
          <Avatar seed={post?.subreddit[0]?.topic} />
          <p className='text-xs text-gray-400'>
            <Link href={`subreddit/${post?.subreddit[0]?.topic}`}>
            <span className='font-bold text-black hover:text-blue-400 hover:underline'>r/{post?.subreddit[0]?.topic.toLowerCase()}</span>
            </Link>
            &nbsp; · Posted by u/{post.username}  {' '}
            <TimeAgo date={post.created_at}/>
            </p>         
            </div>

        {/* Body */}
        <div className="py-4">
          <div className="text-xl font-semibold">{post.title}</div>
          <div className='mt-2 text-sm font-light'>{post.body}</div>
        </div>

        {/* Image */}
        <img className='w-full' src={post.image} alt="" />

        {/* Footer */}
        <div className="flex space-x-4 text-gray-400">
          <div className="postBtns">
            <ChatAltIcon className='h-6 w-6'/>
            <p>{post.comments.length}</p>
          </div>

          <div className="postBtns">
            <GiftIcon className='h-6 w-6'/>
            <p className='hidden sm:inline'>Award</p>
          </div>

          <div className="postBtns">
            <ShareIcon className='h-6 w-6'/>
            <p className='hidden sm:inline'>Share</p>
          </div>

          <div className="postBtns">
            <BookmarkIcon className='h-6 w-6'/>
            <p className='hidden sm:inline'>Save</p>
          </div>

          <div className="postBtns">
            <DotsHorizontalIcon className='h-6 w-6'/>
            {/* <p className='hidden sm:inline'>Save</p> */}
          </div>
        </div>
        </div>
    </div>
    </Link>
  )
}

export default Post