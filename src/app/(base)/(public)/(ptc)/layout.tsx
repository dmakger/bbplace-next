'use client'
import { Loading } from "@/shared/ui/Loading/Loading";
import { WrapperGap } from "@/shared/ui/Wrapper/Gap/WrapperGap";
import { NavBarPTC } from "@/widgets/NavBarPTC";
import { useParams } from "next/navigation";
import { PropsWithChildren, Suspense } from "react";

export default function Layout({ children }: PropsWithChildren<unknown>) {
    const params = useParams()
    
    return (
        <Suspense fallback={<Loading />}>
            <WrapperGap>
                {!params.id && <NavBarPTC/>}
                {children}
            </WrapperGap>
        </Suspense>
    )
}
