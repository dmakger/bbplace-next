import { FC, ReactNode } from "react";


export interface INavBarPTCOptions {
    id: number,
    name: string
}

export interface IIconVariants {
    id: number,
    name: string,
    image: ReactNode
}

export const NavBarPTCOptions: INavBarPTCOptions[] = [
    { id: 1, name: 'Товары' },
    { id: 2, name: 'Поставщики' },
    { id: 3, name: 'Тендеры' }
]

interface IIcons {
    width?: number,
    height?: number
}


const HorizontalIcon: FC<IIcons> = ({ width = 36, height = 36 }) => (
    <svg width={width} height={height} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 10.9999H27.0007" stroke="#979399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 15H24.0004" stroke="#979399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 21H27.0007" stroke="#979399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 25.0001H24.0004" stroke="#979399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 11C9 10.7348 9.10537 10.4804 9.29292 10.2929C9.48047 10.1054 9.73485 10 10.0001 10H14.0004C14.2657 10 14.52 10.1054 14.7076 10.2929C14.8952 10.4804 15.0005 10.7348 15.0005 11V15C15.0005 15.2652 14.8952 15.5196 14.7076 15.7071C14.52 15.8947 14.2657 16 14.0004 16H10.0001C9.73485 16 9.48047 15.8947 9.29292 15.7071C9.10537 15.5196 9 15.2652 9 15V11Z" stroke="#979399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21C9 20.7348 9.10537 20.4804 9.29292 20.2929C9.48047 20.1054 9.73485 20 10.0001 20H14.0004C14.2657 20 14.52 20.1054 14.7076 20.2929C14.8952 20.4804 15.0005 20.7348 15.0005 21V25C15.0005 25.2652 14.8952 25.5196 14.7076 25.7071C14.52 25.8947 14.2657 26 14.0004 26H10.0001C9.73485 26 9.48047 25.8947 9.29292 25.7071C9.10537 25.5196 9 25.2652 9 25V21Z" stroke="#979399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const VerticalIcon: FC<IIcons> = ({ width = 36, height = 36 }) => (
    <svg width={width} height={height} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10H16V16H10V10Z" stroke="#979399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M20 10H26V16H20V10Z" stroke="#979399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10 20H16V26H10V20Z" stroke="#979399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M19.7773 20H25.7773V26H19.7773V20Z" stroke="#979399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
);

export const SortIcon: FC<IIcons> = ({ width = 18, height = 19 }) => (
    <svg width={width} height={height} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 3.5C9 4.03043 9.21071 4.53914 9.58579 4.91421C9.96086 5.28929 10.4696 5.5 11 5.5C11.5304 5.5 12.0391 5.28929 12.4142 4.91421C12.7893 4.53914 13 4.03043 13 3.5C13 2.96957 12.7893 2.46086 12.4142 2.08579C12.0391 1.71071 11.5304 1.5 11 1.5C10.4696 1.5 9.96086 1.71071 9.58579 2.08579C9.21071 2.46086 9 2.96957 9 3.5Z" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M1 3.5H9" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M13 3.5H17" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M3 9.5C3 10.0304 3.21071 10.5391 3.58579 10.9142C3.96086 11.2893 4.46957 11.5 5 11.5C5.53043 11.5 6.03914 11.2893 6.41421 10.9142C6.78929 10.5391 7 10.0304 7 9.5C7 8.96957 6.78929 8.46086 6.41421 8.08579C6.03914 7.71071 5.53043 7.5 5 7.5C4.46957 7.5 3.96086 7.71071 3.58579 8.08579C3.21071 8.46086 3 8.96957 3 9.5Z" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M1 9.5H3" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M7 9.5H17" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12 15.5C12 16.0304 12.2107 16.5391 12.5858 16.9142C12.9609 17.2893 13.4696 17.5 14 17.5C14.5304 17.5 15.0391 17.2893 15.4142 16.9142C15.7893 16.5391 16 16.0304 16 15.5C16 14.9696 15.7893 14.4609 15.4142 14.0858C15.0391 13.7107 14.5304 13.5 14 13.5C13.4696 13.5 12.9609 13.7107 12.5858 14.0858C12.2107 14.4609 12 14.9696 12 15.5Z" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M1 15.5H12" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M16 15.5H17" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)


export const MobileSortIcon: FC<IIcons> = ({ width = 29, height = 29 }) => (
    <svg width={width} height={height} viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_862_4651)">
            <path d="M13.5 6.75C13.5 7.34674 13.7371 7.91903 14.159 8.34099C14.581 8.76295 15.1533 9 15.75 9C16.3467 9 16.919 8.76295 17.341 8.34099C17.7629 7.91903 18 7.34674 18 6.75C18 6.15326 17.7629 5.58097 17.341 5.15901C16.919 4.73705 16.3467 4.5 15.75 4.5C15.1533 4.5 14.581 4.73705 14.159 5.15901C13.7371 5.58097 13.5 6.15326 13.5 6.75Z" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4.5 6.75H13.5" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M18 6.75H22.5" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.75 13.5C6.75 14.0967 6.98705 14.669 7.40901 15.091C7.83097 15.5129 8.40326 15.75 9 15.75C9.59674 15.75 10.169 15.5129 10.591 15.091C11.0129 14.669 11.25 14.0967 11.25 13.5C11.25 12.9033 11.0129 12.331 10.591 11.909C10.169 11.4871 9.59674 11.25 9 11.25C8.40326 11.25 7.83097 11.4871 7.40901 11.909C6.98705 12.331 6.75 12.9033 6.75 13.5Z" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4.5 13.5H6.75" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.25 13.5H22.5" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M16.875 20.25C16.875 20.8467 17.1121 21.419 17.534 21.841C17.956 22.2629 18.5283 22.5 19.125 22.5C19.7217 22.5 20.294 22.2629 20.716 21.841C21.1379 21.419 21.375 20.8467 21.375 20.25C21.375 19.6533 21.1379 19.081 20.716 18.659C20.294 18.2371 19.7217 18 19.125 18C18.5283 18 17.956 18.2371 17.534 18.659C17.1121 19.081 16.875 19.6533 16.875 20.25Z" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4.5 20.25H16.875" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M21.375 20.25H22.5" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0_862_4651">
                <rect width="27" height="27" fill="white" />
            </clipPath>
        </defs>
    </svg>

)


export const viewVariants: IIconVariants[] = [
    {
        id: 1, name: 'Horizontal', image: <HorizontalIcon />,
    },
    {
        id: 2, name: 'Vertical', image: <VerticalIcon />
    }
]
