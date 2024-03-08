'use client'
import Script from 'next/script'
import React from 'react'
import { gapiLoaded, gisLoaded, handleAuthClick, listLabels, listMessages, showMessage, handleSignoutClick } from './f.js'
export default function page() {
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
      <div>
        <button onClick={handleAuthClick}>Sign in with Google</button>
        <button id="signout_button" onClick={
          () => handleSignoutClick()
        }>Sign Out</button>


        <pre id="content"></pre>
        <button id="load_messages_button" onClick={
          () => listMessages()
        }>Load Messages</button>
        <main id="main"></main>
      </div>
    </>
  )
}
