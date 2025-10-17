'use client'

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IoLogoGithub } from "react-icons/io";
import ScoreBoard from '../components/Scoreboard';

const App = () => {
    const router = useRouter();

    return (
        <>
            <div className="w-screen h-screen flex justify-center bg-black/5 items-center flex-col gap-8">
                <div className="flex rounded-lg h-4/6 w-[300] md:w-[400] bg-white drop-shadow-xl flex-col overflow-hidden p-5 md:p-10 gap-5">
                    <div className='flex flex-col items-center'>
                        <div className="font-extrabold text-3xl text-center"><span className='text-xl'>Welcome to</span><br/> What's The word?</div>
                    </div>
                    <div className='flex justify-center items-center h-auto flex-col overflow-hidden'>
                        <button className="flex rounded-xl border-2 md:px-4 py-2 items-center justify-center gap-1">
                        <img className='h-6' src='https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw'/>Google
                        </button>
                        <div className='flex rounded-lg drop-shadow bg-white m-5 overflow-y-scroll'>
                            <div className='scale-90'><ScoreBoard/></div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className="text-sm text-black/50 flex gap-2 items-center">
                            <IoLogoGithub />Developed By <a href="https://github.com/AZDEV2006" className="underline text-black">AZ</a> & <a href="https://github.com/SeanNachapat" className="underline text-black">SeanNachapat</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;