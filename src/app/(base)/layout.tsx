import cl from './_PublicLayout.module.scss'
import { PropsWithChildren } from "react";
import { WrapperGap } from "@/shared/ui/Wrapper/Gap/WrapperGap";
import { TopBar } from '@/features/TopBar';
import { Footer } from '@/widgets/Footer';
import { UpdateAuth } from '@/entities/Auth/ui/update/UpdateAuth';
import { NotifyList } from '@/features/Notify/ui/List/NotifyList';
import { LKButtonRightMarginBlock } from '@/features/LKButtonAddMarginBlock';
import { MobileNavbar } from '@/widgets/MobileNavbar';

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <WrapperGap>
            <UpdateAuth />
            <TopBar isAuto={true} />
            <div className={cl.content}>
                {children}
                <Footer/>
            </div>
            <LKButtonRightMarginBlock/>
            {/* <MobileNavbar/> */}
            <NotifyList />
        </WrapperGap>
    )
}
