import { useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CompanionForm from "@/components/CompanionForm";
import { getUserCompanions } from "@/lib/actions/companion.actions";

const NewCompanion = () => {
  // const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState<number>(0);
  console.log("user")

  useEffect(() => {
    if (isLoaded && !user) {
      navigate("/sign-in");
    }
  }, [isLoaded, user, navigate]);

  useEffect(() => {
    const checkPermissions = async () => {
      if (!user?.id) return;

      try {
        const companions = await getUserCompanions(user.id);
        const companionCount = companions.length;
        setCount(companionCount);

        const plan = user.publicMetadata?.plan;
        let allowed = false;

        if (plan === "Basic") {
          // Basic plan allows up to 3 companions
          allowed = companionCount < 3;
        } else if (plan === "Core Learner") {
          // Core Learner allows up to 10 companions
          allowed = companionCount < 10;
        } else if (plan === "Pro Companion") {
          // Pro Companion has no limit
          allowed = true;
        }

        setHasPermission(allowed);
      } catch (err) {
        console.error("Error checking permissions:", err);
        setHasPermission(false);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded) {
      checkPermissions();
    }
  }, [isLoaded, user]);

  if (loading) return <p className="text-center">Checking permissions…</p>;

  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      {hasPermission ? (
        <article className="w-full gap-4 flex flex-col">
          <h1>Companion Builder</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="companion-limit">
          <img
            src="/Saas-app/images/limit.svg"
            alt="Companion limit reached"
            width={360}
            height={230}
          />

          <div className="cta-badge">Upgrade your plan</div>

          <h1>You've reached your limit</h1>

          <p>
            You’ve created {count} companions. Your current plan ({user?.publicMetadata?.plan})
            has reached its limit. Upgrade to create more companions and unlock premium features.
          </p>

          <Link to="/subscription" className="btn-primary w-full justify-center">
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewCompanion;
