import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280'
import { FooterBottom } from '../components/bottom/FooterBottom'
import { FooterMiddle } from '../components/middle/FooterMiddle'
import { FooterTop } from '../components/top/FooterTop'
import cl from './_Footer.module.scss'


export const Footer = () => {
  return (
    <footer>
      <Wrapper1280 classNameContent={cl.content} classNameWrapper={cl.wrapper}>
        <FooterTop/>
        <FooterMiddle/>
        <FooterBottom/>
      </Wrapper1280>
    </footer>
  )
}
