import React, { useEffect, useState } from 'react';
import {HomeIcon, SearchIcon, LibraryIcon, RssIcon, HeartIcon, PlusCircleIcon} from '@heroicons/react/outline'
import {signOut, useSession} from "next-auth/react"
import useSpotify from '../hooks/useSpotify'


const sidebar = () => {
    const spotifyApi = useSpotify()
    const {data: session, status} = useSession()
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        if(spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items)
            })
        }
    }, [session, spotifyApi])

    console.log(playlists)

    return (
        <div className='overflow-y-scroll scrollbar-hide h-screen bg-red-500 text-gray-500 p-5 w-60 text-sm border-gray-900'>
            <div className='space-y-6'>
            <button onClick={() => signOut()} className='flex items-center space-x-3 hover:text-white hover:bg-purple-600'>
                    <HomeIcon className='h-5 w-5'/>
                    <p>Logout</p>
                </button>
                <button className='flex items-center space-x-3 hover:text-white'>
                    <HomeIcon className='h-5 w-5'/>
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-3 hover:text-white'>
                    <SearchIcon className='h-5 w-5'/>
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-3 hover:text-white'>
                    <LibraryIcon className='h-5 w-5' />
                    <p>Your library</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900'></hr>
                <button className='flex items-center space-x-3 hover:text-white'>
                    <PlusCircleIcon className='h-5 w-5'/>
                    <p>Create playlist</p>
                </button>
                <button className='flex items-center space-x-3 hover:text-white'>
                    <HeartIcon className='h-5 w-5'/>
                    <p>Liked songs</p>
                </button>
                <button className='flex items-center space-x-3 hover:text-white'>
                    <RssIcon className='h-5 w-5' />
                    <p>Your episodes</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900'></hr>

                {/* Playlists */}
                <p className='cursor-pointer hover:text-white'>Playlist name...</p>
                <p className='cursor-pointer hover:text-white'>Playlist name...</p>
                <p className='cursor-pointer hover:text-white'>Playlist name...</p>
                <p className='cursor-pointer hover:text-white'>Playlist name...</p>
                <p className='cursor-pointer hover:text-white'>Playlist name...</p>
                <p className='cursor-pointer hover:text-white'>Playlist name...</p>
                <p className='cursor-pointer hover:text-white'>Playlist name...</p>
            </div>
        </div>
    );
};

export default sidebar;