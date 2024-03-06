'use client'
import { google } from 'googleapis';
import React, { useEffect, useState } from 'react';

const CLIENT_ID = '7464836572-lq57ibd7mi4t5dctk95lhp89b04vitkv.apps.googleusercontent.com';
const API_KEY = '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';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;

const GmailAPIQuickstart = () => {
  const handleAuthClick = async () => {
    // implementation
  };

  const handleSignoutClick = () => {
    // implementation
  };

  const listLabels = async () => {
    // implementation
  };

  const listMessages = async () => {
    // implementation
  };

  const showMessage = async (messageId:any) => {
    // implementation
  };

  useEffect(() => {
    const gapiLoaded = async () => {
      loadGapiClient();
    };

    const loadGapiClient = async () => {
      await window.gapi.load('client', initializeGapiClient);
    };

    const initializeGapiClient = async () => {
      await window.gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
      gapiInited = true;
      maybeEnableButtons();
    };


    window.gapiLoaded = gapiLoaded;

    const gisLoaded = () => {
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
      });
      gisInited = true;
      maybeEnableButtons();
    };

    window.gisLoaded = gisLoaded;

    const maybeEnableButtons = () => {
      if (gapiInited && gisInited) {
        document.getElementById('authorize_button').style.visibility = 'visible';
      }
    };

    return () => {
      // Cleanup code here
    };
  }, []);

  return (
    <div>
      <p>Gmail API Quickstart</p>
      <button id="authorize_button" onClick={handleAuthClick}>Authorize</button>
      <button id="signout_button" onClick={handleSignoutClick}>Sign Out</button>
      <pre id="content" style={{ whiteSpace: 'pre-wrap' }}></pre>
      <button id="load_messages_button" onClick={listMessages}>Load Messages</button>
      <main id="main"></main>
    </div>
  );
};

export default GmailAPIQuickstart;
