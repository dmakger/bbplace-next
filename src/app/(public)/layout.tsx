import cl from './_PublicLayout.module.scss'
import { Header } from "@/widgets/Header";
import { MobileNavbar } from "@/widgets/MobileNavbar";
import { PropsWithChildren } from "react";
import { WrapperGap } from "@/shared/ui/Wrapper/Gap/WrapperGap";

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <WrapperGap>
            <Header />
            <div className={cl.content}>
                {children}
            </div>
            <MobileNavbar/>
        </WrapperGap>
    )
}
