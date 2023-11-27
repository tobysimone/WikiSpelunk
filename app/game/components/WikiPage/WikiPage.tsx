import './styles.css';
import './wiki-styles.css';

import { useEffect, useState } from "react";
import { notFound } from 'wikipedia';

export interface WikiPageProps {
    page: string | notFound;
}

export default function WikiPage({ wikiPage, handleWikiPageClick }: { wikiPage: WikiPageProps | null, handleWikiPageClick: (word: string) => void }) {
    const [sanitizedPage, setSanitizedPage] = useState('');

    useEffect(() => {
        setupPage();
        setupLinkInterceptor();
    }, [wikiPage]);

    const setupPage = () => {
        if (wikiPage) {
            sanitizeWikiPage(wikiPage);
        }
    }

    const sanitizeWikiPage = (wikiPage: WikiPageProps) => {
        if (typeof wikiPage.page === 'string') {
            setSanitizedPage(/*purify.sanitize(*/wikiPage.page/*)*/);
        } else {
            setSanitizedPage('');
        }
    }

    const setupLinkInterceptor = () => {
        const root = document.querySelector('.wikipedia-page');
        root?.addEventListener('click', (e) => {
            if(e.target instanceof HTMLAnchorElement) {
                e.preventDefault();
                handleLinkClick(e.target.href);
            }
        });
    }

    const handleLinkClick = (url: string) => {
        if(!url) {
            console.debug(`No url found for link click`);
            return;
        }

        const split = url.split('/wiki/');
        if(split.length > 1) {
            handleWikiPageClick(split[1]);
        }
    }

    return (
        <div className="wiki-container">
            <span className="wikipedia-page" dangerouslySetInnerHTML={{ __html: sanitizedPage }}></span>
        </div>
    )
}