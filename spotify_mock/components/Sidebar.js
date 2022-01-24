import React from 'react';
import {HomeIcon, SearchIcon, LibraryIcon, RssIcon, HeartIcon, PlusCircleIcon} from '@heroicons/react/outline'


const sidebar = () => {
    return (
        <div className='bg-red-500 text-gray-500 p-5 text-sm border-gray-900'>
            <div>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HomeIcon className='h-5 w-5'/>
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <SearchIcon className='h-5 w-5'/>
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <LibraryIcon className='h-5 w-5' />
                    <p>Your library</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900'></hr>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlusCircleIcon className='h-5 w-5'/>
                    <p>Create playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className='h-5 w-5'/>
                    <p>Liked songs</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <RssIcon className='h-5 w-5' />
                    <p>Your episodes</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900'></hr>
                
            </div>
        </div>
    );
};

export default sidebar;