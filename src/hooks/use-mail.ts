import { atom, useAtom } from "jotai"

import { Mail, mails } from "../app/data"
import { listMessages } from "@/app/try/f"
import { get } from "http"

const getEmails = async () => {
    const m = await listMessages()
    console.log(m[0][0].id)
    return m[0][0].id
}
type Config = {
    selected: Mail["id"] | null
}

const configAtom = atom<Config>({
    selected: getEmails() || mails[0].id,
})

export function useMail() {
    return useAtom(configAtom)
}
