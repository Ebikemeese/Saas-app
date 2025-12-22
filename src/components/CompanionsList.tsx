import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Companion } from "../../types/index.d.ts"
import { cn, getSubjectColor } from "@/lib/utils";
import { Link } from "react-router-dom";

interface CompanionsListProps {
    title: string;
    companions?: Companion[];
    classNames?: string;
}

const CompanionsList = ({ 
    title, 
    companions, 
    classNames }: CompanionsListProps
) => {

    if (companions?.length === 0) { return null; }

    return (
        <article className={cn("companion-list", classNames )}>
            <h2 className="font-bold text-3xl">{title}</h2>
        
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg w-2/3">Lessons</TableHead>
                        <TableHead className="text-lg">Subject</TableHead>
                        <TableHead className="text-lg text-right">Durations</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companions?.map((companion) => (
                        <TableRow key={companion.id}>
                            <TableCell className="font-medium">
                                <Link to={`/companions/${companion.id}`}>
                                    <div className="flex items-center gap-2">
                                        <div 
                                            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                                            style={{ backgroundColor: getSubjectColor(companion.subject) }}
                                        >
                                            <img 
                                                src={`/Saas-app/icons/${companion.subject}.svg`} 
                                                alt={companion.subject}
                                                width={35}
                                                height={35}
                                                title={companion.subject}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <p className="font-bold text-2xl">
                                                {companion.name}
                                            </p>

                                            <p className="text-lg">
                                                {companion.topic}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </TableCell>

                            <TableCell>
                                <div className="subject-badge w-fit max-md:hidden">
                                    {companion.subject}
                                </div>

                                <div 
                                    className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden"
                                    style={{ backgroundColor: getSubjectColor(companion.subject) }}
                                >
                                    <img 
                                        src={`/Saas-app/icons/${companion.subject}.svg`} 
                                        alt={companion.subject}
                                        width={18}
                                        height={18}
                                        title={companion.subject}
                                    />
                                </div>
                            </TableCell>

                            <TableCell>
                                <div className="flex items-center gap-2 w-full justify-end">
                                    <p className="text-2xl">
                                        {companion.duration} {" "}
                                        <span className="max-md:hidden">mins</span>
                                    </p>

                                    <img 
                                        src="/Saas-app/icons/clock.svg" 
                                        alt="minutes"
                                        width={14}
                                        height={14}
                                        className="md:hidden" 
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                        
                </TableBody>
            </Table>
        </article>
    )
}

export default CompanionsList