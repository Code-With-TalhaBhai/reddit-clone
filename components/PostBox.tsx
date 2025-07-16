import { useSession } from 'next-auth/react'
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from 'react'
import Avatar from './subcomponents/Avatar';
import { LinkIcon,PhotographIcon } from '@heroicons/react/outline';
import { client } from '../apollo-client';
import { getAllPosts, getSubredditByTopic } from '../graphql/queries';
import { useMutation } from '@apollo/client';
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';


type Props = {
    subreddit?: string
}
type Inputs = {
    postTitle: string;
    postBody: string;
    postImage: string;
    subReddit: string;
  };

function PostBox({subreddit}: Props) {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Inputs>();
    const [Add_Post] = useMutation(ADD_POST,{
        refetchQueries:[
            {query:getAllPosts},
            "AllPosts"
        ]
    });
    const [Add_SubReddit] = useMutation(ADD_SUBREDDIT);
    const {data:session} = useSession();
    const [imgOpen, setImgOpen] = useState<boolean>(false);
    const router = useRouter()

    const onSubmit: SubmitHandler<Inputs> = async(formData) => {
        try{
            const {data:subRedditExist} = await client.query({
                query:  getSubredditByTopic,
                variables:{
                    topic: subreddit || formData.subReddit.toUpperCase()
                }
            });

            const subRedditbyTopic = await subRedditExist.getSubredditListByTopic;
            const image = formData?.postImage || null;
            if(!subRedditbyTopic){

                const {data:{insertSubReddit:reddit_Id}} = await Add_SubReddit({
                    variables:{
                        topic: formData.subReddit.toUpperCase()
                    }
                })

                // Adding Post
                const {data:postCheck} = await Add_Post({
                    variables:{
                        title: formData.postTitle,
                        image: image,
                        subreddit_id: reddit_Id.id,
                        body: formData.postBody,
                        username: session?.user?.name
                    }
                })

                toast.success('Post Added In New SubReddit')
            }else{

                const {data:postID} = await Add_Post({
                    variables:{
                        title: formData.postTitle,
                        image: image,
                        subreddit_id: subRedditbyTopic?.id,
                        body: formData.postBody,
                        username: session?.user?.name
                    }
                })
                toast.success('Post Added In Existing SubReddit')
            }
            setValue("postBody",'')
            setValue("postImage",'')
            setValue("postTitle",'')
            setValue("subReddit",'')
            router.reload()
        }catch(error){
            // console.log('error is',error);
            toast.error("Something wrong while creating post")
        }
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='sticky top-20 z-50 rounded-md border border-gray-300 bg-white p-2'>
    <div className='flex items-center space-x-3'>
        {/* Avatar */}
        <Avatar seed={session?.user?.name|| 'random'}/>

        {/* Input */}
        <input
        {...register('postTitle',{required:true})}
        disabled={!session}
        className='flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none'
        type="text"
        placeholder={session?subreddit?`Create a post about r/${subreddit}`:"Create a post by entering a title":"Sign-In to create post"} 
        />

        {/* Icons */}
    <PhotographIcon onClick={()=>setImgOpen(!imgOpen)} className={`icon ${imgOpen && 'text-blue-300'}`}/>
    <LinkIcon className='icon' />
    </div>

    {watch('postTitle') &&(
        <div className='flex flex-col py-2'>
            <div className="flex items-center px-2">
                <p className='min-w-[90px]'>Body:</p>
                <input {...register('postBody')} className='m-2 flex-1 p-2 bg-blue-50 outline-none' type="text" placeholder='Text (optional)' />
            </div>
        
            {!subreddit && (
            <div className='my-4'>
            {errors.subReddit && <span className='ml-24 space-y-2 p-2 text-red-500'>This field is required</span>}
            <div className="flex items-center px-2">
                <p className='min-w-[90px]'>Subreddit:</p>
                <input {...register('subReddit',{required:true})} className='m-2 flex-1 p-2 bg-blue-50 outline-none' type="text" placeholder='i.e. reactjs' />
            </div>
            </div>
            )}

        {imgOpen && (
            <div className="flex items-center px-2">
                <p className='min-w-[90px]'>Image URL:</p>
                <input {...register('postImage')} className='m-2 flex-1 p-2 bg-blue-50 outline-none' type="text" placeholder='Optional...' />
            </div>
        )}

            <button disabled={!session} type='submit' className='w-full outline-none rounded-full p-2 bg-blue-400 text-white'>Create Post</button>
        </div>
    )}

    </form>
  )
}

export default PostBox