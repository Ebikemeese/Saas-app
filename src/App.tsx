import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/root/HomePage";
import CompanionsLibrary from "./pages/companions/CompanionsLibrary";
import Profile from "./pages/my-journey/Profile";
import CompanionSession from "./pages/companions/CompanionSession";
import NewCompanion from "./pages/companions/NewCompanion"
import SignInPage from "./pages/sign-in/SignInPage";
import Subscription from "./pages/subscription/Subscription";
import SignUpPage from "./pages/sign-in/SignUpPage";
import * as Sentry from '@sentry/react';

function App() {

  return (
      <HelmetProvider>
        <BrowserRouter basename="/Saas-app">
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="companions" element={<CompanionsLibrary />}/>
              <Route path="my-journey" element={<Profile />} />
              <Route path="companions/:id" element={<CompanionSession />} />
              <Route path="companions/new" element={<NewCompanion />} />
              <Route path="sign-in" element={<SignInPage />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="sign-up" element={<SignUpPage />} />
            </Route>
          </Routes>
        </BrowserRouter> 

     </HelmetProvider> 
      
  )
}

export default Sentry.withProfiler(App)
