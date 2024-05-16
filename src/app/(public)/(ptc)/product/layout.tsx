import { Loading } from "@/shared/ui/Loading/Loading";
import { PropsWithChildren, Suspense } from "react";

export default function ProductCatalogLayout({ children }: PropsWithChildren<unknown>) {
    return (
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    )
}
