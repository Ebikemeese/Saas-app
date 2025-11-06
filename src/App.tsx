import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/root/HomePage";


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
              {/* <Route path="my-banks" element={<MyBanks />}/>
              <Route path="transaction-history" element={<TransactionHistory />} />
              <Route path="payment-transfer" element={<Transfer />} /> */}
              

            </Route>
          </Routes>
        </BrowserRouter> 

     </HelmetProvider> 
      
  )
}

export default App
