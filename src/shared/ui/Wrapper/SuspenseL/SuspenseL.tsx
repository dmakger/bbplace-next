import { FC, ReactNode, Suspense } from "react"
import { Loading } from "../../Loading/Loading";

interface SuspenseLProps{
    children: ReactNode,
}

export const SuspenseL: FC<SuspenseLProps> = ({children}) => {
    return (
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    )
}
