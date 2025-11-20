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
            let newUrl;

            if (searchQuery) {
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                });

                navigate(newUrl);
            } else {
                navigate(pathname);
            }

        }, 500)

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, navigate, searchParams, pathname]);
    

    return (
        <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
            <img 
                src="/icons/search.svg"
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