import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { formUrlQuery } from "@jsmastery/utils"

const SearchInput = () => {

    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const query = searchParams.get("topic") || "";
    const [searchQuery, setSearchQuery] = useState(query)

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
            // just build the query string
            const newParams = `topic=${searchQuery}`;
            navigate({ pathname, search: `?${newParams}` });
            console.log("New url", `${pathname}?${newParams}`);
            } else {
            navigate({ pathname });
            console.log("Pathname", pathname);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, pathname, navigate]);


    return (
        <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
            <img 
                src="/Saas-app/icons/search.svg"
                alt="search" 
                width={15}
                height={15}
            />

            <input 
                type="text" 
                placeholder="Search companions..."
                className="outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    )
}

export default SearchInput