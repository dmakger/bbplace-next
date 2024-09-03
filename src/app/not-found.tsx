import { NOT_AUTH_MOBILE_DATA } from "@/shared/data/menu/mobile.menu.data";
import { MobileNavbar } from "@/widgets/MobileNavbar";
import { NotFoundChildrenPage } from "@/widgets/Pages/NotFound";

export default function NotFoundPage() {
    return (
        <>
            <NotFoundChildrenPage />
            <MobileNavbar menuData={NOT_AUTH_MOBILE_DATA} />
        </>
    )
}