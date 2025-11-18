import CompanionCard from "@/components/CompanionCard"
import CompanionsList from "@/components/CompanionsList"
import Cta from "@/components/Cta"
import {recentSessions} from "../../../constants/index"

const HomePage = () => {
    return (
        <main>
            <h1 className="text-2xl">
                Dashboard
            </h1>

            <section className="home-section">
                <CompanionCard 
                    id="123"
                    name="Neural the Brainy Explorer"
                    topic="Neural Network of the Brain"
                    subject="science"
                    duration={45}
                    color="#ffda6e"
                />
                <CompanionCard 
                    id="234"
                    name="Countsy the Number Wizard"
                    topic="Derivatives & Integrals"
                    subject="maths"
                    duration={30}
                    color="#e5d0ff"
                />
                <CompanionCard 
                    id="423"
                    name="Verba the Vocabulary Builder"
                    topic="English Literature"
                    subject="language"
                    duration={45}
                    color="#BDE7FF"
                />
                
            </section>

            <section className="home-section">
                <CompanionsList 
                    // title="Recently completed sessions"
                    companions={recentSessions}
                    classNames="w-2/3 max-lg:w-full"
                />
                <Cta />
            </section>
        </main>
    )
}

export default HomePage