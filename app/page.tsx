'use client';

import { useState } from 'react';
import './styles.css';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [startingWord, setStartingWord] = useState<string>('');
  const [endingWord, setEndingWord] = useState<string>('');

  return (
    <div className="container-fluid w-full flex flex-col items-center mt-5 page-container">
      <div className="flex flex-col mt-5">
        <input 
          type="text" 
          id="startingWord" 
          className="word-input text-black dark:text-white" 
          placeholder="Starting word"
          onChange={e => setStartingWord(e.target.value)} 
        />
      </div>
      <div className="flex flex-col mt-5">
        <input 
          type="text" 
          id="endingWord" 
          className="word-input text-black dark:text-white" 
          placeholder="Ending word"
          onChange={e => setEndingWord(e.target.value)} 
        />
      </div>
      <div className="mt-5">
        <button className="text-white font-bold play-button" onClick={() => {
          router.push('/game?startingWord=' + startingWord + '&endingWord=' + endingWord);
        }}>
          Spelunk!
        </button>
      </div>
    </div>
  )
}