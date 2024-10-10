"use client"

import { FC, useState } from "react"

import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { IOptionTabChat } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"
import { LK_CHATS_PAGE, SWITCH_SELECTOR__CHAT__OPTION } from "@/shared/ui/SwitchSelector/data/switchSelector.data"
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280"
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT"
import { ChatChildrenPage } from "@/widgets/Pages/LK/Chat/ui/Page/ChatChildrenPage"
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize"

interface ChatParentChildrenPageProps{
    className?: string,
}

export const ChatParentChildrenPage:FC<ChatParentChildrenPageProps> = ({className}) => {
    // STATE
    const [is1024, setIs1024] = useState(false)

    const CHAT__OPTIONS_TAB: IOptionTabChat = {
        chat: { 
            optionTab: <ChatChildrenPage />, 
            optionValue: String(SWITCH_SELECTOR__CHAT__OPTION.value) 
        },
    }

    return (
        <Wrapper1280>
            <WrapperLKPT pageTitle={""} 
                options={LK_CHATS_PAGE} optionsTab={CHAT__OPTIONS_TAB}
                startPage={SWITCH_SELECTOR__CHAT__OPTION} 
                buttonBackProps={{href: is1024 ? DASHBOARD_PAGES.CHATS(undefined).path : DASHBOARD_PAGES.HOME.path}}
                isButtonRight={false}/>
            <HandleSize width={1024} set={setIs1024} />
        </Wrapper1280>
    )
}
