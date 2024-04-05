import { Header } from "@/widgets/Header";
import { MobileNavbar } from "@/widgets/MobileNavbar";
import { NavBarPTC } from "@/widgets/NavBarPTC";
import { PropsWithChildren } from "react";
import { WrapperGap } from "@/shared/ui/Wrapper/Gap/WrapperGap";

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <WrapperGap>
            <Header />
            {children}
            <MobileNavbar/>
        </WrapperGap>
    )
}
