import Header from "@/widgets/Header/ui/Header";
import { NavBarPTC } from "@/widgets/NavBarPTC";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <div>
            <NavBarPTC/>
            {children}
        </div>
    )
}
