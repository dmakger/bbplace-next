import { MAIN_PAGES } from "@/config/pages-url.config"
import { HorizontalIcon } from "@/shared/data/icons.data"
import { IIconVariants, IIcons } from "@/shared/model/icon.model"

const ItemsIcon = ({width = 28, height = 27}: IIcons) => (
    <svg width={width} height={height} viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_939_5871)">
    <path d="M3.875 6.75C3.875 6.15326 4.11205 5.58097 4.53401 5.15901C4.95597 4.73705 5.52826 4.5 6.125 4.5H21.875C22.4717 4.5 23.044 4.73705 23.466 5.15901C23.8879 5.58097 24.125 6.15326 24.125 6.75C24.125 7.34674 23.8879 7.91903 23.466 8.34099C23.044 8.76295 22.4717 9 21.875 9H6.125C5.52826 9 4.95597 8.76295 4.53401 8.34099C4.11205 7.91903 3.875 7.34674 3.875 6.75Z" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6.125 9V20.25C6.125 20.8467 6.36205 21.419 6.78401 21.841C7.20597 22.2629 7.77826 22.5 8.375 22.5H19.625C20.2217 22.5 20.794 22.2629 21.216 21.841C21.6379 21.419 21.875 20.8467 21.875 20.25V9" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M11.75 13.5H16.25" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </g>
  <defs>
    <clipPath id="clip0_939_5871">
      <rect width="27" height="27" fill="white" transform="translate(0.5)" />
    </clipPath>
  </defs>
</svg>
)

const CompanyIcon = ({width = 30, height = 29}: IIcons) => (
    <svg width={width} height={height} viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_939_5004)">
    <path d="M6.5415 20.5417C6.5415 21.1826 6.79612 21.7973 7.24933 22.2505C7.70254 22.7037 8.31723 22.9583 8.95817 22.9583C9.59911 22.9583 10.2138 22.7037 10.667 22.2505C11.1202 21.7973 11.3748 21.1826 11.3748 20.5417C11.3748 19.9007 11.1202 19.286 10.667 18.8328C10.2138 18.3796 9.59911 18.125 8.95817 18.125C8.31723 18.125 7.70254 18.3796 7.24933 18.8328C6.79612 19.286 6.5415 19.9007 6.5415 20.5417Z" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M18.625 20.5417C18.625 21.1826 18.8796 21.7973 19.3328 22.2505C19.786 22.7037 20.4007 22.9583 21.0417 22.9583C21.6826 22.9583 22.2973 22.7037 22.7505 22.2505C23.2037 21.7973 23.4583 21.1826 23.4583 20.5417C23.4583 19.9007 23.2037 19.286 22.7505 18.8328C22.2973 18.3796 21.6826 18.125 21.0417 18.125C20.4007 18.125 19.786 18.3796 19.3328 18.8328C18.8796 19.286 18.625 19.9007 18.625 20.5417Z" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6.54167 20.5415H4.125V7.24984C4.125 6.92937 4.25231 6.62202 4.47891 6.39542C4.70552 6.16881 5.01286 6.0415 5.33333 6.0415H16.2083V20.5415M11.375 20.5415H18.625M23.4583 20.5415H25.875V13.2915M25.875 13.2915H16.2083M25.875 13.2915L22.25 7.24984H16.2083" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </g>
  <defs>
    <clipPath id="clip0_939_5004">
      <rect width="29" height="29" fill="white" transform="translate(0.5)" />
    </clipPath>
  </defs>
</svg>
)

export const PRODUCTS_ITEM_MENU_WEB_DATA: IIconVariants = {
    id: 1,
    link: MAIN_PAGES.PRODUCTS,
    title: "Товары",
    image: <ItemsIcon/>
}

export const TENDERS_ITEM_MENU_WEB_DATA: IIconVariants = {
    id: 2,
    link: MAIN_PAGES.TENDERS,
    title: "Тендеры",
    image: <HorizontalIcon width={27} height={27}/>,
}

export const COMPANIES_ITEM_MENU_WEB_DATA: IIconVariants = {
    id: 3,
    link: MAIN_PAGES.SUPPLIERS,
    title: "Поставщики",
    image: <CompanyIcon/>,
}


// DATA
export const MENU_WEB_DATA: IIconVariants[] = [
    PRODUCTS_ITEM_MENU_WEB_DATA,
    TENDERS_ITEM_MENU_WEB_DATA,
    COMPANIES_ITEM_MENU_WEB_DATA,
]