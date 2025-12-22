import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { getUserCompanions, type CompanionResponse, type SessionHistoryQuery } from "@/lib/actions/companion.actions";
import { getUserSessions } from "@/lib/actions/companion.actions";
import { useState, useEffect } from "react";
import CompanionsList from "@/components/CompanionsList";



const Profile = () => {

    const [companions, setCompanions] = useState<CompanionResponse[]>([])
    const [sessionHistory, setSessionHistory] = useState<SessionHistoryQuery[]>([])
    const { userId, isLoaded } = useAuth();
    const navigate = useNavigate();
    const { user } = useUser()

    // console.log("User info:", user)
    useEffect(() => {
        if (!user?.id) {
        navigate("/sign-in");
        }

    }, [isLoaded, userId, navigate, companions]);

    useEffect(() => {
        const fetchCompanion = async () => {
            if (!user?.id) return;
            try {
                const data = await getUserCompanions(user?.id);
                setCompanions(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchCompanion();
    }, [user?.id]);

    useEffect(() => {
        const fetchSession = async () => {
        if (!user?.id) return;
        try {
            const data = await getUserSessions(user?.id);
            setSessionHistory(data);
        } catch (error) {
            console.log(error)
        }
        };

        fetchSession();
    }, [user?.id]);

    if (!user) {
        navigate("/sign-in")
    }

    return (
        <main className="min-lg:w-3/4">
            <section className="flex justify-between gap-4 max-sm:flex-col items-center">
                <div className="flex gap-4 items-center">
                    <img 
                        src={user?.imageUrl}
                        alt={`${user?.firstName}-Profile-picture`} 
                        width={110}
                        height={110}
                    />

                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold text-2xl">
                            {user?.firstName} {user?.lastName}
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            {user?.emailAddresses[0].emailAddress}
                        </p>
                    </div>
                </div>
                
                <div className="flex gap-4">
                    <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
                        <div className="flex gap-2 items-center">
                            <img 
                                src="/Saas-app/icons/check.svg" 
                                alt="checkmark" 
                                height={22}
                                width={22}
                            />

                            <p className="text-2xl font-bold">
                                {sessionHistory.length}
                            </p>

                            <div>Lessons completed</div>
                        </div>
                    </div>

                    <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
                        <div className="flex gap-2 items-center">
                            <img 
                                src="/Saas-app/icons/cap.svg" 
                                alt="cap" 
                                height={22}
                                width={22}
                            />

                            <p className="text-2xl font-bold">
                                {companions.length}
                            </p>

                            <div>Companions created</div>
                        </div>
                    </div>
                </div>
            </section>

            <Accordion type="multiple">
                <AccordionItem value="recent">
                    <AccordionTrigger className="text-2xl font-bold">
                        Recent Sessions
                    </AccordionTrigger>

                    <AccordionContent>
                        <CompanionsList title="My Sessions" companions={sessionHistory}/>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="companions">
                    <AccordionTrigger className="text-2xl font-bold">
                        My Companions {`(${companions.length})`}
                    </AccordionTrigger>

                    <AccordionContent>
                        <CompanionsList title="My Companions" companions={companions}/>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            
        </main>
    )
}

export default Profile