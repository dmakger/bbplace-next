import { Header } from "@/widgets/Header";
import { MobileNavbar } from "@/widgets/MobileNavbar";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <>
            <Header />
            {children}
            <MobileNavbar/>
        </>
    )
}