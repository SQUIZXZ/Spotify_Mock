import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistState, playlistIdState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';


const Center = () => {
    const {data: session} = useSession()
    const playlistId = useRecoilValue(playlistIdState)
    const [playlist, setPlaylist] = useRecoilState(playlistState)
    const spotifyApi = useSpotify()

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body)
        }).catch((err) => console.log("Fetching getPlaylist in center error", err))
    }, [spotifyApi, playlistId])

    console.log(playlist)
    
    return (
        <div className='flex-grow bg-white '>
            <header className='absolute top-5 right-8 '>
                <div className='flex items-center bg-black space-x-4 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white'>
                    <img className='rounded-full h-11 w-11'  src={session?.user?.image} alt="User profile picture"></img>
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className='h-5 w-5'></ChevronDownIcon>
                </div>
            </header>
            <section className={`bg-[url('https://images.pexels.com/photos/4055000/pexels-photo-4055000.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')] bg-center bg-no-repeat bg-cover flex items-end space-x-8 text-white h-80`}>
            <img src={playlist?.images?.[0]?.url} className='h-48 w-48 shadow-2xl'></img>
            <div>
                <h1>Playlist</h1>
                <h2>{playlist?.name}</h2>
                <p>{playlist?.description}</p>
            </div>
            </section>
            <div></div>
        </div>
    );
};

export default Center;