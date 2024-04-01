import { WrapperGap } from "@/shared/ui/Wrapper/Gap/WrapperGap";
import { NavBarPTC } from "@/widgets/NavBarPTC";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <WrapperGap>
            <NavBarPTC/>
            {children}
        </WrapperGap>
    )
}
