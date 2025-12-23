// import { getAllCompanions } from "@/lib/actions/companion.actions"
import { useEffect, useState } from "react"
import { type CompanionResponse } from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
// import { useSearchParams } from "react-router-dom";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { getUserCompanions } from "@/lib/actions/companion.actions";
import { useUser } from "@clerk/clerk-react";

const CompanionsLibrary = () => {

    const [companions, setCompanions] = useState<CompanionResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { userId, isLoaded } = useAuth();
    const navigate = useNavigate();
    const { user } = useUser()

    // console.log("User info:", user)
    useEffect(() => {
        if (!user?.id) {
        // navigate("/sign-in");
        }

    }, [isLoaded, userId, navigate, companions]);
    
    useEffect(() => {
        const fetchCompanions = async () => {
            try {
                if (!user?.id) return;
                const data = await getUserCompanions(user?.id); 
                setCompanions(data);
            } catch (err) {
                console.log(error)
                setError((err as Error).message);
            } 
        };

        fetchCompanions();
    }, [userId]);

    return (
        <main>
            <section className="flex justify-between gap-4 max-sm:flex-col">  
                <h1>Companion Library</h1>
                <div className="flex gap-4">
                    <SearchInput />
                    <SubjectFilter />
                </div>
            </section>
            
            <section className="flex gap-3 max-md:flex-col max-md:my-2">
                {companions.map((companion) => (
                    <CompanionCard 
                        key={companion.id}
                        {...companion}
                        color={getSubjectColor(companion.subject)}
                    />
                ))}
            </section>
        </main>
    )
}

export default CompanionsLibrary