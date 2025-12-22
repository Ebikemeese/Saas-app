import CompanionCard from "@/components/CompanionCard"
import CompanionsList from "@/components/CompanionsList"
import Cta from "@/components/Cta"
import { useEffect, useState } from "react"
import { getAllCompanions, type CompanionResponse } from "@/lib/actions/companion.actions"
import { getRecentSessions } from "@/lib/actions/companion.actions"
import { getSubjectColor } from "@/lib/utils"
import { useAuth } from "@clerk/clerk-react"

const HomePage = () => {

    const { getToken } = useAuth()
    const [recentSessions, setRecentSessions] = useState<CompanionResponse[]>([])
    const [companions, setCompanions] = useState<CompanionResponse[]>([])

    useEffect(() => {
      
        const fetchCompanions = async () => {
            const limit = 3;
            const page = 1;
            try {
                const fetchCompanion = await getAllCompanions(limit, page)
                setCompanions(fetchCompanion);
            } catch (error) {
                console.log(error)
            }
        }
     
        fetchCompanions()
    }, [])

    useEffect(() => {
        const fetchRecentSessions = async () => {
            const limit = 10;

            try {
                const token = await getToken({ template: "default" })
                
                if (!token) {
                    return
                }
                const fetchRecentSession = await getRecentSessions(token, limit)
                setRecentSessions(fetchRecentSession)
            } catch (error) {
                console.log(error)
            }
        }
    
        fetchRecentSessions()
    }, [])
    

    return (
        <main>
            <h1 className="text-2xl">
                Dashboard
            </h1>

            <section className="home-section">

                {companions.map((companion) => (
                    <CompanionCard 
                        {...companion}
                        key={companion.id}
                        color={getSubjectColor(companion.subject)}
                    />
                ))}
                
            </section>

            <section className="home-section">
                <CompanionsList 
                    title="Recently completed sessions"
                    companions={recentSessions}
                    classNames="w-2/3 max-lg:w-full"
                />
                <Cta />
            </section>
        </main>
    )
}

export default HomePage