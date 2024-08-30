import { WrapperRole } from "@/shared/ui/Wrapper/1280/Role";

export default function PricesNDiscountsLayout({
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