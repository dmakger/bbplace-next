import { Header } from "@/widgets/Header";
import { MobileNavbar } from "@/widgets/MobileNavbar";
import { NavBarPTC } from "@/widgets/NavBarPTC";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <div>
            <Header />
            <Header/>
            <NavBarPTC/>
            {children}
            <MobileNavbar/>
        </div>
    )
}
