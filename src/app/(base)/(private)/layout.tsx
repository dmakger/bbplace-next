import { LK_MOBILE_DATA } from "@/shared/data/menu/mobile.menu.data";
import { WrapperAuth } from "@/shared/ui/Wrapper/Auth/WrapperAuth";
import { HeaderLK } from "@/widgets/HeaderLK";
import { MobileNavbar } from "@/widgets/MobileNavbar";

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
        <MobileNavbar menuData={LK_MOBILE_DATA} />
      </WrapperAuth>
    </>
  )
}