import Image from 'next/image'
import React from 'react'
import {ChevronDownIcon, HomeIcon, MenuIcon, SearchIcon} from '@heroicons/react/solid';
import {GlobeIcon, VideoCameraIcon, SparklesIcon, ChatIcon, BellIcon, SpeakerphoneIcon ,PlusIcon} from '@heroicons/react/outline'
import { useSession, signIn, signOut } from 'next-auth/react';


type Props = {}

function Header({}: Props) {
    const {data:session} = useSession();
    return (
        <div className='sticky top-0 z-50 flex items-center bg-white px-4 py-2 shadow-sm'>
            <div className='relative w-20 h-10 flex-shrink-0 cursor-pointer'>
            <a href='/'>
            <Image 
            src="/reddit_img.png"
            objectFit='contain'
            layout='fill'/>
            </a>
            </div>

            <div className="mx-7 flex items-center xl:min-w-[300px]">
                <HomeIcon className='w-5 h-5'/>
                <p className='ml-2 hidden flex-1 lg:inline'>Home</p>
                <ChevronDownIcon className='w-5 h-5'/>
            </div>

            <form className='flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1'>
                <SearchIcon className='w-6 h-6 text-gray-400' />
                <input type="text"
                className='flex-1 bg-transparent outline-none'
                placeholder='Search Reddit'
                />
                <button type='submit' hidden/>
            </form>

            <div className='mx-5 items-center space-x-2 text-gray-500 hidden lg:inline-flex'>
                <SparklesIcon className='icon'/>
                <GlobeIcon className='icon'/>
                <VideoCameraIcon className='icon'/>
                <hr className='h-10 border border-gray-100'/>
                <ChatIcon className='icon'/>
                <BellIcon className='icon'/>
                <PlusIcon className='icon'/>
                <SpeakerphoneIcon className='icon'/>
            </div>

            <div className='ml-5 flex items-center lg:hidden'>
                <MenuIcon className='icon'/>
            </div>

            {/* SignIn and SignOut button */}
            <div onClick={()=>session?signOut():signIn()}
            className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex"> 
                <div className='relative h-5 w-5 flex-shrink-0'>
                    <Image 
                    src="https://links.papareact.com/23l"
                    layout='fill'
                    alt=''
                    />
                </div>
                {session?
                <div className='flex-1 text-xs'>
                    <p className='truncate'>{session?.user?.name}</p>
                    <p className='text-gray-400'>1 Karma</p>
                </div>
                :
                <p className='text-gray-400'>Sign In</p>
                }
            </div>
        </div>
    )
}

export default Header