import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CompanionForm from "@/components/CompanionForm";

const NewCompanion = () => {

    const { userId, isLoaded } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !userId) {
        navigate("/sign-in");
        }
    }, [isLoaded, userId, navigate]);

    

    return (
        <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
            <article className="w-full gap-4 flex flex-col">
                <h1>Companion Builder</h1>

                <CompanionForm />
            </article>
        </main>
    )
}

export default NewCompanion