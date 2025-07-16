import Image from 'next/image'
import React from 'react'
import { useSession } from 'next-auth/react'

type Props = {
    seed?: string;
    large?: boolean;
}

function Avatar({seed,large}: Props) {
    const {data:session} = useSession();
  return (
    <div className={`relative overflow-hidden rounded-full ${large?'w-20 h-20':'w-10 h-10'} border-gray-300 bg-white`}>
        <Image
        layout='fill'
        objectFit='cover'
        src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${seed || 'placeholder'}`} />
    </div>

  )
}

export default Avatar