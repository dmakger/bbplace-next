import { Header } from "@/widgets/Header";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}