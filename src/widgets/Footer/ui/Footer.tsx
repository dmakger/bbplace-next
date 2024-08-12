import { FooterBottom } from '../components/bottom/FooterBottom'
import { FooterMiddle } from '../components/middle/FooterMiddle'
import { FooterTop } from '../components/top/FooterTop'
import cl from './_Footer.module.scss'


export const Footer = () => {
  return (
    <footer className={cl.Footer}>
        <FooterTop/>
        <FooterMiddle/>
        <FooterBottom/>
    </footer>
  )
}
