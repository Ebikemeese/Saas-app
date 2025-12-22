import { PricingTable } from "@clerk/clerk-react"
import { useSession } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { CompanionResponse } from "@/lib/actions/companion.actions";



const Subscription = () => {
 
    const { session } = useSession(); 
    const location = useLocation();
    const [companions, setCompanions] = useState<CompanionResponse[]>([])
    const { userId, isLoaded } = useAuth();
    const navigate = useNavigate();
    const { user } = useUser()

    console.log("set companions:", setCompanions)
    useEffect(() => {
        if (!user?.id) {
        navigate("/sign-in");
        }

    }, [isLoaded, userId, navigate, companions]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const status = params.get("__clerk_status");

        // ✅ Only reload after returning from checkout
        if (status === "success" && session) {
        session.reload();
        }
    }, [location.search, session]);


    return (
        <main>
            <PricingTable />
        </main>
    )
}

export default Subscription