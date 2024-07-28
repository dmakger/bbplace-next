import { cls } from "@/shared/lib/classes.lib"
import cl from './_HeaderLK.module.scss'
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280"
import { HeaderMenuLeft } from "../components/HeaderLeft/HeaderMenuLeft"
import { HeaderMenuMiddle } from "../components/HeaderMiddle/HeaderMenuMiddle"
import { HeaderMenuRight } from "../components/HeaderRight/HeaderMenuRight"

interface IHeaderLK {
    className?: string,

}

export const HeaderLK = ({ className }: IHeaderLK) => {

    return (
        <header className={cls(cl.HeaderLK, className)}>
            <Wrapper1280 classNameContent={cl.content}>

                <HeaderMenuLeft className={cl.leftMenu} />
                <HeaderMenuMiddle className={cl.middleMenu} />
                <HeaderMenuRight className={cl.rightMenu} />

            </Wrapper1280>
        </header>
    )
}
