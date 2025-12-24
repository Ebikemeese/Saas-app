import { getAllCompanions } from "@/lib/actions/companion.actions"
import { useEffect, useState } from "react"
import { type CompanionResponse } from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const CompanionsLibrary = () => {
  const [companions, setCompanions] = useState<CompanionResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const { user } = useUser();
  const [searchParams] = useSearchParams();

  const subject = searchParams.get("subject") || undefined;
  const topic = searchParams.get("topic") || undefined;

  useEffect(() => {
    if (!user?.id) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate, companions]);

  useEffect(() => {
    const fetchCompanions = async () => {
      try {
        if (!user?.id) return;
        // ✅ pass limit, page, subject, topic correctly
        const data = await getAllCompanions(20, 1, subject, topic);
        setCompanions(data);
      } catch (err) {
        console.log(error);
        setError((err as Error).message);
      }
    };

    fetchCompanions();
  }, [userId, subject, topic]);

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">  
        <h1>Companion Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      
      <section className="hom-section">
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

export default CompanionsLibrary;
