import { WrapperAuth } from "@/shared/ui/Wrapper/Auth/WrapperAuth";
import { HeaderLK } from "@/widgets/HeaderLK";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderLK />
      <WrapperAuth>
        {children}
      </WrapperAuth>
    </>
  )
}