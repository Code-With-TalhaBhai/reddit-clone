import { useRouter } from "next/router";
import Avatar from "../../components/subcomponents/Avatar";
import React from "react";
import PostBox from "../../components/PostBox";
import Feed from "../../components/Feed";


function Subreddit(){
    const {query: {topic}} = useRouter()
    return (
        <div className="h-24 bg-red-400 p-8">
            <div className="mx-8 mt-10 bg-white">
                <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
                    <div className="-mt-5">
                        <Avatar seed={topic as string} large/>
                    </div>
                    <div className="py-2">
                        <h1 className="text-3xl font-semibold">
                            Welcome to the r/{topic} subreddit
                        </h1>
                        <p>r/{topic}</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-5 max-w-5xl pb-18">
                <PostBox subreddit={topic as string}/>
                <Feed topic={topic as string}/>
            </div>
        </div>
    )
}



export default Subreddit;