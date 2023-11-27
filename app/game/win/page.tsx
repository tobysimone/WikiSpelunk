'use client';

import { useScreen } from 'usehooks-ts';
import './styles.css';

import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';

export default function WinPage() {
    const [showConfetti, setShowConfetti] = useState<boolean>(false);

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
            </div>
        </div>
    )
}