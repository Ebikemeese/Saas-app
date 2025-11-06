import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/root/HomePage";
import CompanionsLibrary from "./pages/companions/CompanionsLibrary";
import Profile from "./pages/my-journey/Profile";


function App() {

  return (
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            
            {/* Routes without layout */}
            {/* <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} /> */}

            {/* Routes with layout */}
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="companions" element={<CompanionsLibrary />}/>
              <Route path="my-journey" element={<Profile />} />
              

            </Route>
          </Routes>
        </BrowserRouter> 

     </HelmetProvider> 
      
  )
}

export default App
