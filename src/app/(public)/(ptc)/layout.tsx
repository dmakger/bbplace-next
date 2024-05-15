import { Loading } from "@/shared/ui/Loading/Loading";
import { WrapperGap } from "@/shared/ui/Wrapper/Gap/WrapperGap";
import { NavBarPTC } from "@/widgets/NavBarPTC";
import { PropsWithChildren, Suspense } from "react";

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <Suspense fallback={<Loading />}>
            <WrapperGap>
                <NavBarPTC/>
                {children}
            </WrapperGap>
        </Suspense>
    )
}
