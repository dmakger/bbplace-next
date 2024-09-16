'use client'
import { Loader } from "@/shared/ui/Loader";
import { WrapperGap } from "@/shared/ui/Wrapper/Gap/WrapperGap";
import SuspenseL from "@/shared/ui/Wrapper/SuspenseL/SuspenseL";
import { NavBarPTC } from "@/widgets/NavBarPTC";
import { useParams } from "next/navigation";
import { PropsWithChildren, Suspense } from "react";

export default function Layout({ children }: PropsWithChildren<unknown>) {
    const params = useParams()
    
    return (
        <SuspenseL>
            <WrapperGap>
                {!params.id && <NavBarPTC/>}
                {children}
            </WrapperGap>
        </SuspenseL>
    )
}
