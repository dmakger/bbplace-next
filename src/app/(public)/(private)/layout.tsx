import { WrapperAuth } from "@/shared/ui/Wrapper/Auth/WrapperAuth";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
        <WrapperAuth>
            {children}
        </WrapperAuth>
    )
  }