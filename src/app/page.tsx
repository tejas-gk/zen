'use client'
import React from 'react';
import Script from 'next/script';
import { gapiLoaded, gisLoaded, handleAuthClick, listMessages, handleSignoutClick, listLabels } from './try/f.js';
import { Mail } from "@/components/mail";
import { accounts } from "./data";
import { MailCheck, MailCheckIcon } from 'lucide-react';

const MailPage = () => {
  const [mail, setMail] = React.useState([]);
  const [lab, setLab] = React.useState([]);
  const [auth, setAuth] = React.useState(false);

  const d = [19.4852941176, 32.3529411765, 48.1617647059];

  return (
    <>
      <Script
        src="https://apis.google.com/js/api.js"
        strategy="afterInteractive"
        onLoad={gapiLoaded}
      />
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={gisLoaded}
      />
      <div className="flex justify-center space-x-4 mb-4">
        <button onClick={() => {
          handleAuthClick();
          setAuth(true);
        }} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md">
          <MailCheckIcon />
          <span className="mr-2">Sign in with Google</span>
          {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 19l-7-7 7-7" />
          </svg> */}
        </button>
        <button id="load_messages_button" onClick={async () => {
          const m = await listMessages();
          const l = await listLabels();
          setLab(l);
          setMail(m);
          console.log(l);
          console.log(mail);
        }} className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md">
          <span className="mr-2">Load Messages</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
        {
          auth === true ? <button id="signout_button" onClick={handleSignoutClick} className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md">
            <span className="mr-2">Sign Out</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button> : null
        }
        {/* <button id="signout_button" onClick={handleSignoutClick} className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md">
          <span className="mr-2">Sign Out</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button> */}
        {/* <button onClick={filterOTP} className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-md">
          <span className="mr-2">OTP</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button> */}
      </div>
      <main id="main"></main>

      <div className="flex-col md:flex">
        <MemoizedMail
          accounts={accounts}
          mails={mail}
          defaultLayout={d}
          defaultCollapsed={undefined}
          navCollapsedSize={4}
          labels={lab}
        />
      </div>
    </>
  );
};
const MemoizedMail = React.memo(Mail);
export default React.memo(MailPage);
