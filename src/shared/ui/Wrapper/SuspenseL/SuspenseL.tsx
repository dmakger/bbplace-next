import { FC, ReactNode, Suspense } from "react"
import { Loading } from "../../Loading/Loading";
import { SuspenseLTender } from "./Tender/SuspenseLTender";
import { SuspenseLAny } from "./Any/SuspenseLAny";

interface SuspenseLProps{
    children: ReactNode,
}

export default function SuspenseL({children}: SuspenseLProps) {
    return (
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    )
}

SuspenseL.Tender = SuspenseLTender
SuspenseL.Any = SuspenseLAny