'use client'
import React from 'react';
import Script from 'next/script';
import { gapiLoaded, gisLoaded, handleAuthClick, listMessages, handleSignoutClick } from './try/f.js';
import { Mail } from "@/components/mail";
import { accounts } from "./data";

const MailPage = () => {
  const [mail, setMail] = React.useState([]);

  const d = [19.4852941176, 32.3529411765, 48.1617647059];

  const filterOTP = React.useCallback(() => {
    // Implement your filter logic here
  }, []);

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
      <button onClick={handleAuthClick}>Sign in with Google</button>
      <pre id="content"></pre>
      <button id="load_messages_button" onClick={async () => {
        const m = await listMessages();
        setMail(m);
        console.log(mail);
      }}>Load Messages</button>
      <button id="signout_button" onClick={handleSignoutClick}>Sign Out</button>
      <button onClick={filterOTP}>OTP</button>
      <main id="main"></main>

      <div className="flex-col md:flex">
        <MemoizedMail
          accounts={accounts}
          mails={mail}
          defaultLayout={d}
          defaultCollapsed={undefined}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
};
const MemoizedMail = React.memo(Mail);
export default React.memo(MailPage);
