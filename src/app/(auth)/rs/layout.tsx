import { PropsWithChildren } from "react";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";


export default function RedirectsLayout({ children }: PropsWithChildren<unknown>) {


    return (
        <Wrapper1280>
            <div>
                {children}
            </div>
        </Wrapper1280>
    )
}
