// import { MAIN_PAGES } from "@/config/pages-url.config";
// import { IMenuItem } from "@/shared/model/menu.model";

import { IIconVariants, IIcons } from "@/shared/model/icon.model";

// import ProductSVG from '@/shared/assets/img/product.svg'
// import TenderSVG from '@/shared/assets/img/tender.svg'
// import CompanySVG from '@/shared/assets/img/company.svg'


// // ===={ MENU DATA }====

// export const PRODUCTS_ITEM_MENU_DATA: IMenuItem = {
//     link: MAIN_PAGES.PRODUCTS,
//     title: "Товары",
//     image: ProductSVG,
// }

// export const TENDERS_ITEM_MENU_DATA: IMenuItem = {
//     link: MAIN_PAGES.TENDERS,
//     title: "Тендеры",
//     image: TenderSVG,
// }

// export const COMPANIES_ITEM_MENU_DATA: IMenuItem = {
//     link: MAIN_PAGES.COMPANIES,
//     title: "Поставщики",
//     image: CompanySVG,
// }


// // DATA
// export const MENU_DATA: IMenuItem[] = [
//     PRODUCTS_ITEM_MENU_DATA,
//     TENDERS_ITEM_MENU_DATA,
//     COMPANIES_ITEM_MENU_DATA,
// ]



export const HorizontalIcon = ({ width = 26, height = 25 }: IIcons) => (
    <svg width={width} height={height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_902_2445)">
            <path d="M13.9658 5.2085H21.9905" stroke="#979399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13.9658 9.375H18.9813" stroke="#979399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13.9658 15.625H21.9905" stroke="#979399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13.9658 19.7915H18.9813" stroke="#979399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3.93457 5.20817C3.93457 4.9319 4.04025 4.66695 4.22837 4.4716C4.41648 4.27625 4.67162 4.1665 4.93766 4.1665H8.95C9.21604 4.1665 9.47118 4.27625 9.65929 4.4716C9.84741 4.66695 9.95309 4.9319 9.95309 5.20817V9.37484C9.95309 9.6511 9.84741 9.91606 9.65929 10.1114C9.47118 10.3068 9.21604 10.4165 8.95 10.4165H4.93766C4.67162 10.4165 4.41648 10.3068 4.22837 10.1114C4.04025 9.91606 3.93457 9.6511 3.93457 9.37484V5.20817Z" stroke="#979399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3.93457 15.6252C3.93457 15.3489 4.04025 15.0839 4.22837 14.8886C4.41648 14.6932 4.67162 14.5835 4.93766 14.5835H8.95C9.21604 14.5835 9.47118 14.6932 9.65929 14.8886C9.84741 15.0839 9.95309 15.3489 9.95309 15.6252V19.7918C9.95309 20.0681 9.84741 20.3331 9.65929 20.5284C9.47118 20.7238 9.21604 20.8335 8.95 20.8335H4.93766C4.67162 20.8335 4.41648 20.7238 4.22837 20.5284C4.04025 20.3331 3.93457 20.0681 3.93457 19.7918V15.6252Z" stroke="#979399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </g>
    </svg>
);

export const HORIZONTAL_VIEW: IIconVariants = {
    id: 1, title: 'Horizontal', image: <HorizontalIcon />
}