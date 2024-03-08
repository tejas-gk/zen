import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Mail } from "../app/data";
import { useMail } from "@/hooks/use-mail";
import { atom, useAtom } from "jotai";

interface MailListProps {
    items: Mail[][];
}
const emailTypeAtom = atom<string>("Unclassified");
export function MailList({ items }: MailListProps) {
    const [mail, setMail] = useMail();
    const [emailType, setEmailType] = useAtom(emailTypeAtom);
    console.log(items)

    const classifyEmail = (subject: string) => {
        // const categories: { [key: string]: string[] } = {
        //     OTP: ["otp", "code", "verification"],
        //     Newsletter: ["newsletter", "update", "edition", "notification"],
        //     WelcomeEmail: ["welcome", "registration", "account", "Hello There", "Granted"],
        // };

        // for (const [category, keywords] of Object.entries(categories)) {
        //     for (const keyword of keywords) {
        //         console.log(`Checking keyword '${keyword}' for category '${category}'`);
        //         if (subject.toLowerCase().includes(keyword)) {
        //             console.log(`Match found for keyword '${keyword}'`);
        //             setEmailType(category);
        //             return category;
        //         }
        //     }
        // }
        // setEmailType("Unclassified");
        // console.log(`No category matched for subject: '${subject}'`);
        return "Unclassified";
    };

    return (
        <ScrollArea className="h-screen">
            <div className="flex flex-col gap-2 p-4 pt-0">
                {items.map((subArray, index) => (
                    <div key={index}>
                        {subArray.map((item) => (
                            <button
                                key={item.id}
                                className={cn(
                                    "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                                    mail.selected === item.id && "bg-muted"
                                )}
                                onClick={() =>
                                    setMail({
                                        ...mail,
                                        selected: item.id,
                                    })
                                }
                            >
                                <div className="flex w-full flex-col gap-1">
                                    <div className="flex items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="font-semibold">{item.name}</div>
                                            {!item.read && (
                                                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                                            )}
                                        </div>
                                        <div
                                            className={cn(
                                                "ml-auto text-xs",
                                                // mail.selected === item.id
                                                //     ? "text-foreground"
                                                //     : "text-muted-foreground"
                                            )}
                                        >
                                            {/* {formatDistanceToNow(new Date(item.date), {
                                                addSuffix: true,
                                            })} */}
                                        </div>
                                    </div>
                                    <div className="text-xs font-medium">{item.subject}</div>
                                </div>
                                <div className="line-clamp-2 text-xs text-muted-foreground">
                                    {/* {item.text.substring(0, 300)} */}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant={getBadgeVariantFromLabel(
                                            classifyEmail(item.subject)
                                        )}
                                    >
                                        {classifyEmail(item.name)}
                                    </Badge>

                                </div>
                                <Separator />
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
}

function getBadgeVariantFromLabel(
    label: string
): ComponentProps<typeof Badge>["variant"] {
    if (["work"].includes(label.toLowerCase())) {
        return "default";
    }

    if (["personal"].includes(label.toLowerCase())) {
        return "outline";
    }

    return "secondary";
}
