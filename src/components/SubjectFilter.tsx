import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { subjects } from "../../constants";

const SubjectFilter = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // default to "all" if no subject param
  const query = searchParams.get("subject") || "all";
  const [searchQuery, setSearchQuery] = useState(query);

  // track first render so we don't navigate immediately
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return; // skip navigation on mount
    }

    if (searchQuery === "all") {
      const newParams = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });
      navigate({ pathname, search: newParams ? `?${newParams}` : "" });
    } else {
      const newParams = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: searchQuery,
      });
      navigate({ pathname, search: `?${newParams}` });
    }
  }, [searchQuery, pathname, searchParams, navigate]);

  return (
    <Select onValueChange={setSearchQuery} value={searchQuery}>
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="Subject" />
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
  );
};

export default SubjectFilter;
