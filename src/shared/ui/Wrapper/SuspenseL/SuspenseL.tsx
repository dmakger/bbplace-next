import { ReactNode, Suspense } from "react"
import { SuspenseLTender } from "./Tender/SuspenseLTender";
import { SuspenseLAny } from "./Any/SuspenseLAny";
import { Loader } from "../../Loader";

interface SuspenseLProps{
    children: ReactNode,
}

export default function SuspenseL({children}: SuspenseLProps) {
    return (
        <Suspense fallback={<Loader />}>
            {children}
        </Suspense>
    )
}

SuspenseL.Tender = SuspenseLTender
SuspenseL.Any = SuspenseLAny