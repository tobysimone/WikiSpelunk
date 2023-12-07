'use client';

import { useScreen } from 'usehooks-ts';
import './styles.css';

import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useSearchParams } from 'next/navigation';

export default function WinPage() {
    const [showConfetti, setShowConfetti] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const startingWord = searchParams.get('startingWord') || '';
    const endingWord = searchParams.get('endingWord') || '';
    const minutes = Number(searchParams.get('minutes') || 0);
    const seconds = searchParams.get('seconds') || '';
    const wordsClicked = searchParams.get('wordsClicked') || '';

    const screen = useScreen();

    useEffect(() => {
        if(screen) {
            setShowConfetti(true);
        }
    }, []);

    return (
        <div className="page-container">
            { showConfetti && (
                <Confetti width={screen?.width} height={screen?.height} recycle={true} gravity={0.1} />
            )}
            <div className="container-fluid w-full flex flex-col items-center justify-center mt-5">
                <p className="text-5xl font-bold text-black dark:text-white" style={{ marginTop: 60 }}>🎉 You win! 🎉</p>
                <p className="text-3xl font-bold text-black dark:text-white">Stats:</p>
                <p className="text-2xl text-black dark:text-white">Starting word: {startingWord}</p>
                <p className="text-2xl text-black dark:text-white">Ending word: {endingWord}</p>
                <p className="text-2xl text-black dark:text-white">Time: { minutes > 0 ? <>{minutes}.{seconds}</> : <>{seconds}s</>}</p>
                <p className="text-2xl text-black dark:text-white">Words clicked: {wordsClicked}</p>
            </div>
        </div>
    )
}