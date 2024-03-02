import Header from "@/widgets/Header/ui/Header";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}
