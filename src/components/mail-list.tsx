import React, { useCallback, useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Mail } from "../app/data";
import { useMail } from "@/hooks/use-mail";
import { atom, useAtom } from "jotai";
import { Copy } from "lucide-react";

interface MailListProps {
    items: Mail[][];
}

const emailTypeAtom = atom<string>("Unclassified");

export function MailList({ items }: MailListProps) {
    const [mail, setMail] = useMail();
    const [emailType, setEmailType] = useAtom(emailTypeAtom);

    const classifyEmail = useCallback((subject: string, setEmailType: (type: string) => void) => {
        // Your classification logic goes here
    }, []);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
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
                                        <div className="flex items-center gap-2" onClick={() => copyToClipboard(item.name)}>
                                            <div className="font-semibold">{item.name}</div>
                                            {!item.read && (
                                                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                                            )}
                                        </div>
                                        <div
                                            className={cn(
                                                "ml-auto text-xs",
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
                                {/* <div className="flex items-center gap-2">
                                    <Badge
                                        variant={getBadgeVariantFromLabel(
                                            classifyEmail(item.subject, setEmailType)
                                        )}
                                    >
                                        {classifyEmail(item.name, setEmailType)}
                                    </Badge>

                                </div> */}
                                <Copy
                                    onClick={() => copyToClipboard(item.name)}
                                ></Copy>
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
