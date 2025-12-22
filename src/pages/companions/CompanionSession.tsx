import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanionById, type CompanionResponse } from "@/lib/actions/companion.actions"
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { getSubjectColor } from "../../lib/utils"
import CompanionComponent from "../../components/CompanionComponent"


const CompanionSession = () => {
    const { id } = useParams<{ id: string }>(); // grab the id from the URL
    const [companion, setCompanion] = useState<CompanionResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { user } = useUser();
    const { userId, isLoaded } = useAuth();
    const navigate = useNavigate();
    // console.log("User", user)
    useEffect(() => {
        if (isLoaded && !userId) {
        navigate("/sign-in");
        }
        
        // if (isLoaded && !companion) {
        //     navigate("/companions");
        // }
    }, [isLoaded, userId, navigate, companion]);
    

    useEffect(() => {
        const fetchCompanion = async () => {
        if (!id) return;
        try {
            const data = await getCompanionById(id);
            setCompanion(data);
        } catch (err: any) {
            console.log(error)
            setError(err.message);
        }
        };

        fetchCompanion();
    }, [id]);

    

     if (!companion) {
        return <div className="flex items-center justify-center">Loading Companion</div>
    }
   
    return (
        <main>
            <article className="flex rounded-border justify-between p-6 max-md:flex-col">
                <div className="flex items-center gap-2">
                    <div 
                        className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                        style={{
                            backgroundColor: getSubjectColor(companion.subject)
                        }}
                    >
                        <img
                            src={`/Saas-app/icons/${companion.subject}.svg`}
                            alt={companion.subject}
                            width={35}
                            height={35}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <p className="font-bold text-2xl">
                                {companion.name}
                            </p>

                            <div className="subject-badge max-sm:hidden">
                                {companion.subject}
                            </div>
                        </div>
                        
                        <p className="text-lg">
                            {companion.topic}
                        </p>
                    </div>
                </div>

                <div className="items-start text-2xl max-md:hidden">
                    {companion.duration} minutes
                </div>
            </article>

            <CompanionComponent 
                companionId={companion.id}
                subject={companion.subject}
                topic={companion.topic}
                name={companion.name}
                userName={`${user?.firstName} ${user?.lastName}`}
                userImage={user?.imageUrl ?? ""}
                voice={companion.voice}
                style={companion.style}
                userId={user?.id ?? ""}
            />
        </main>
    );
};

export default CompanionSession;
