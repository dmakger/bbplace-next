import { MobileNavbar } from "@/widgets/MobileNavbar";
import { PropsWithChildren } from "react";
import { WrapperGap } from "@/shared/ui/Wrapper/Gap/WrapperGap";


export default function NotAuthLayout({ children }: PropsWithChildren<unknown>) {


    return (
        <WrapperGap>
            <div>
                {children}
            </div>
            <MobileNavbar />
        </WrapperGap>
    )
}
