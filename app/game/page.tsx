'use client'

import './styles.css';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import wiki from 'wikipedia';
import Loading from '../_components/loading/Loading';
import WikiPage, { WikiPageProps } from './components/WikiPage/WikiPage';
import { IoMdStopwatch } from 'react-icons/io';
import { IoIosArrowRoundForward } from "react-icons/io";
import { LuMousePointerClick } from "react-icons/lu";
import { overflowString } from '../_shared/util/TextUtil';

export default function Game() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [history, setHistory] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [wikiPage, setWikiPage] = useState<WikiPageProps | null>(null);
    const [time, setTime] = useState({ minutes: 0, seconds: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => {
                const newSeconds = prevTime.seconds + 1;
                const newMinutes = prevTime.minutes + Math.floor(newSeconds / 60);
                return { minutes: newMinutes, seconds: newSeconds % 60 };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const startingWord = searchParams.get('startingWord') || '';
    const endingWord = searchParams.get('endingWord') || '';

    const handleWikiPageClick = async (word: string, initialLoad?: boolean) => {
        const friendlyWord = await getFriendlyWord(word);
        if(!friendlyWord) {
            return router.push('/');
        }

        const wordIsEndingWord = friendlyWord.toLowerCase() === endingWord.toLowerCase();
        if(wordIsEndingWord) {
            redirectToWin();
        }

        await loadWikiPage(word);

        if(!initialLoad) {
            addWordToHistory(friendlyWord);
        }
    }

    const getFriendlyWord = async (word: string): Promise<string | undefined> => {
        const page = await wiki.page(word);
        const summary = await page?.summary();
        return summary?.title;
    }

    const addWordToHistory = (word: string) => {
        setHistory((prevHistory) => {
            return [...prevHistory, word];
        });
    }

    const loadWikiPage = async (word: string) => {
        (async () => {
            setLoading(true);
            setWikiPage(await getWikiPage(word));
            setLoading(false);
        })();
    }

    const redirectToWin = () => {
        router.push(`/game/win?startingWord=${startingWord}&endingWord=${endingWord}&minutes=${time.minutes}&seconds=${time.seconds}&wordsClicked=${history.length}`);
    }

    useEffect(() => {
        if(!startingWord || !endingWord) {
            router.push('/');
        }
    }, [startingWord, endingWord]);

    useEffect(() => {
        handleWikiPageClick(startingWord, true);
    }, [startingWord]);

    return (
        <>
            <StatsBar startingWord={overflowString(startingWord)} endingWord={overflowString(endingWord)} lastWord={overflowString(history[history.length - 1])} wordsClicked={history.length} time={time} />
            { loading ? (
                <Loading />
            ) : (
                <div className="container-fluid w-full flex flex-col game-container">
                    <WikiPage wikiPage={wikiPage} handleWikiPageClick={handleWikiPageClick} />
                </div>
            )}
        </>
    )
}

function StatsBar({ startingWord, endingWord, lastWord, wordsClicked, time }: { startingWord: string, endingWord: string, lastWord: string, wordsClicked: number, time: any }) {
    
    return (
        <div className="w-full stats-bar">
            <div className="flex flex-col justify-center">
                <div className="flex flex-row items-center">
                    <LuMousePointerClick className="mr-1" />
                    {wordsClicked}
                </div>
                <div className="flex flex-row items-center">
                    <IoMdStopwatch className="mr-1" />
                    <Timer time={time} />
                </div>
            </div>
            <div className="flex flex-row items-center text-sm">
                {startingWord}
                <IoIosArrowRoundForward className="mx-1" />
                {endingWord}
            </div>
            <div className="flex flex-col justify-center text-sm">
                <span className="text-gray-300">Last Word</span>
                {lastWord}
            </div>
        </div>
    )
}

/*function Navbar({ history, startingWord, endingWord }: { history: string[], startingWord: string, endingWord: string }) {
    return (
        <div>
            <h1 className="text-3xl font-bold text-black dark:text-white flex flex-row items-center">
                <TbShovel className="mr-2" />
                WikiSpelunk
            </h1>
            <div className="text-1xl font-bold text-black dark:text-gray-300 flex flex-col items-center justify-center mt-3">
                <div>Starting: {startingWord}</div>
                <div>Ending: {endingWord}</div>
                <div className="flex flex-row">
                    <IoMdStopwatch />
                    <Timer />
                </div>
                <span className="ml-2">words clicked: {history.length}</span>
            </div>
        </div>
    )
}*/

function Timer({ time }: any) {
    return (
        <>
            {time.minutes.toString().padStart(2, '0')}:{time.seconds.toString().padStart(2, '0')}
        </>
    );
}

async function getWikiPage(word: string): Promise<WikiPageProps | null> {
    try {
        const page = await wiki.page(word);
        const html = await page.html();
        
        return {
            page: html
        }
    } catch (e) {
        console.error(e);
        return null;
    }
}