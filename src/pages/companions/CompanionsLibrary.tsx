import { getAllCompanions } from "@/lib/actions/companion.actions"
import { useEffect, useState } from "react"
import { type CompanionResponse } from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
    

const CompanionsLibrary = () => {

    const [companions, setCompanions] = useState<CompanionResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [filters] = useSearchParams();
    const subject = filters.get("subject") || "";
    const topic = filters.get("topic") || "";
    const { userId, isLoaded } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
        navigate("/sign-in");
        }

    }, [isLoaded, userId, navigate, companions]);
    
    useEffect(() => {
        const limit = 10;
        const page = 1;
        const fetchCompanions = async () => {
            try {
                const data = await getAllCompanions(limit, page, subject, topic); 
                setCompanions(data);
            } catch (err) {
                console.log(error)
                setError((err as Error).message);
            } 
        };

        fetchCompanions();
    }, [subject, topic]);

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