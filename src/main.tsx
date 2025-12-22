import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from "@clerk/clerk-react"
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://34ede1942eceb7399378834a840ca313@o4509776083550208.ingest.us.sentry.io/4510580572946432",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLIC_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      appearance={{variables: {colorPrimary: "#fe5933"}}} 
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
)
// to check for valid json https://jsonlint.com/?utm_source=copilot.com