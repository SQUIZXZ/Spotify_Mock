import React from 'react';
import {getProviders, signIn} from "next-auth/react"

const Login = ({providers}) => {

    return (
        <div className='flex flex-col items-center justify-center bg-[#000000] min-h-screen min-w-full w-full]'>
            <img className='w-52 mb-8' src="https://links.papareact.com/9xl" alt="Spotify logo"></img>
            {Object.values(providers).map((provider) => (
                  <div key={provider.name}> 
                    <button onClick={() => signIn(provider.id, {callbackUrl: "/"})} className='bg-[#1DB954] text-black p-5 px-10 rounded-full'>Login with {provider.name}</button>
                </div>
            ))}
            

        </div>
    );
};

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders()

    return {
        props: {
            providers
        }
    }
}