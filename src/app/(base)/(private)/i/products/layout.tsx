import { WrapperRole } from "@/shared/ui/Wrapper/Role";

export default function ProductsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <WrapperRole>
            {children}
        </WrapperRole>
    )
}