import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { subjects } from "../../constants";

const SubjectFilter = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const query = searchParams.get("subject") || "";
    const [searchQuery, setSearchQuery] = useState(query)

    useEffect(() => {
        let newUrl;

        if (searchQuery === "all") {
            newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["subject"],
            });
            navigate(pathname + (newUrl ? `?${newUrl}` : ""));
        } else {
            newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: "subject",
            value: searchQuery,
            });
            navigate(pathname + `?${newUrl}`);
        }
    }, [searchQuery, pathname, navigate, searchParams]);


    return (
        <Select onValueChange={setSearchQuery} value={searchQuery}>
            <SelectTrigger className="input capitalize">
                <SelectValue placeholder="Subject"/>
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                
                {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject} className="capitalize">
                        {subject}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default SubjectFilter