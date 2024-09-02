import { MobileNavbar } from "@/widgets/MobileNavbar";
import { PropsWithChildren } from "react";
import { WrapperGap } from "@/shared/ui/Wrapper/Gap/WrapperGap";
import { NOT_AUTH_MOBILE_DATA } from "@/shared/data/menu/mobile.menu.data";


export default function NotAuthLayout({ children }: PropsWithChildren<unknown>) {


    return (
        <WrapperGap>
            <div>
                {children}
            </div>
            {/* <MobileNavbar menuData={NOT_AUTH_MOBILE_DATA}/> */}
            <MobileNavbar />
        </WrapperGap>
    )
}
