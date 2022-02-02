import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Center = () => {
    const {data: session} = useSession()

    
    
    return (
        <div className='flex-grow bg-white '>
            <header className='absolute top-5 right-8 '>
                <div className='flex items-center bg-black space-x-4 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white'>
                    <img className='rounded-full h-11 w-11'  src={session?.user?.image} alt="User profile picture"></img>
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className='h-5 w-5'></ChevronDownIcon>
                </div>
            </header>
            <section className={`bg-[url('https://images.pexels.com/photos/4055000/pexels-photo-4055000.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')] bg-center flex items-end space-x-7 text-white h-80`}></section>
        </div>
    );
};

export default Center;