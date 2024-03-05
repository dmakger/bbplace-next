import { ComposeChildren } from "@/shared/lib/react.data";
import { ReactNode } from "react";

export function AppProvider({ children }: {children: ReactNode}) {
    return (
        <ComposeChildren>
            {children}
        </ComposeChildren>
    )
}