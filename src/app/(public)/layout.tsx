import {Header} from "@/widgets/Header/ui/Header";
import { PropsWithChildren } from "react";
import { WrapperGap } from "@/shared/ui/Wrapper/Gap/WrapperGap";

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <WrapperGap>
            <Header />
            {children}
        </WrapperGap>
    )
}
