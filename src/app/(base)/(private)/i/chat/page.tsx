"use client"

import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { IOptionTabChat } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize"
import { LK_CHATS_PAGE, SWITCH_SELECTOR__CHAT__OPTION } from "@/shared/ui/SwitchSelector/data/switchSelector.data"
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280"
import { WrapperLKPT } from "@/shared/ui/Wrapper/LKPT"
import { ChatChildrenPage } from "@/widgets/Pages/LK/Chat/ChatChildrenPage"
import { useState } from "react"

export default function ChatPage() {
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
                buttonBackProps={{href: DASHBOARD_PAGES.HOME.path}}
                isButtonAdd={false}/>
            <HandleSize width={1024} set={setIs1024} />
        </Wrapper1280>
    )
}