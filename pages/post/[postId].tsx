import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import TimeAgo from 'react-timeago'
import Avatar from '../../components/subcomponents/Avatar';
import Post from '../../components/subcomponents/Post';
import { ADD_COMMENT } from '../../graphql/mutations';
import { getAllPosts, getComments, getPostListByID } from '../../graphql/queries';
import { comments } from '../../typings/typings';

type Props = {}
type FormData = {
  comment: string;
}


const postWidget = (props: Props) => {
  const {register,handleSubmit,setValue,formState:{errors}} = useForm<FormData>();
  const {query:{postId}} = useRouter();
  const {data:session} = useSession();

  const [Add_Comment,{data,error:err,loading:load}] = useMutation<comments>(ADD_COMMENT
    ,{
      refetchQueries: [
        {query: getAllPosts},
        'AllPosts'
      ]
    }
    );
  
  const {data:queryData,error,loading} = useQuery(getPostListByID,{
    variables:{
        id: postId
    }
});
  const post = queryData?.getPostListById;


  const onSubmit: SubmitHandler<FormData> = async(args)=>{
    const loading = toast.loading('Posting Your Comment')
    await Add_Comment({
      variables: {
        post_id: postId,
        text: args.comment,
        username: session?.user?.name,
      }
    })
    // console.log(args);
    setValue("comment",'');
    toast.success('New Comment Added',{
      id: loading
    })
  };
  
    console.log(post);
  return (
    <div className='mx-auto my-7 max-w-5xl'>
      <Post post={post}/>
      <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
        <p className="text-sm">
          Comment as <span className='text-red-500'>{session?.user?.name}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
          <textarea
          disabled={!session}
          {...register('comment',{required:true})}
          className="h-24 rounded-md border border-gray-200 p-2 pt-4 outline-none disabled:bg-gray-50"
          placeholder={session?'What are your thoughts?' : "Please sign in to comment"}
          />

          <button
          disabled={!session}
          type='submit'
          className='rounded-full bg-red-500 p-3 font-semibold outline-none text-white disabled:bg-gray-200'
          >
            Comment
          </button>
        </form>
      </div>

      <div className="my-5 rounded-md border border-t-0 border-gray-300 bg-white py-5 px-10">
        <hr className="py-2" />

        {
        post?.comments?.map((comment:comments)=>(
          <div className="relative flex items-center space-x-2 space-y-5"
          key={comment.id}>
            <hr className="absolute top-10 left-7 z-0 h-16 border" />
            <div className="z-50">
              <Avatar seed={comment.username}/>
            </div>

            <div className="flex flex-col">
              <p className="py-2 text-xs text-gray-400">
                <span className="font-semibold text-gray-600">
                  {comment.username}
                </span>
                {' '}
                · <TimeAgo date={comment.created_at}/>
              </p>
              <p>{comment.text}</p>
            </div>
          </div>
        ))

        }
      </div>

    </div>
  )
}

export default postWidget;