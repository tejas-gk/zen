'use client'

import { useEffect, useState } from 'react';
import { initGapiClient, initGoogleIdentityServices, listLabels, listMessages, showMessage } from '@/utils/gmailAPI';

export default function Home() {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Initialize Google API Client
        initGapiClient()
            .then(() => {
                setIsAuthorized(true); // You might need additional checks here
            })
            .catch(error => console.error('Error initializing GAPI client:', error));

        // Initialize Google Identity Services
        initGoogleIdentityServices()
            .then(() => {
                // Google Identity Services loaded
            })
            .catch(error => console.error('Error initializing Google Identity Services:', error));
    }, []);

    const handleAuthClick = async () => {
        // Your authentication logic here
    };

    const handleSignoutClick = () => {
        // Your sign out logic here
    };

    return (
        <div>
            <h1>Gmail API Quickstart</h1>
            {isAuthorized ? (
                <>
                    <button onClick={handleSignoutClick}>Sign Out</button>
                    <button onClick={listMessages}>Load Messages</button>
                    {/* Render messages */}
                </>
            ) : (
                <button onClick={handleAuthClick}>Authorize</button>
            )}
        </div>
    );
}
