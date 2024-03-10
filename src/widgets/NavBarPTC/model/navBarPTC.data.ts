export interface INavBarPTCOptions{
    id: number,
    name: string
}

export interface IIconVariants{
    id: number,
    name: string,
    image: string
}

export const NavBarPTCOptions: INavBarPTCOptions[] = [
    {id: 1, name: 'Товары' },
    {id: 2, name: 'Поставщики' },
    {id: 3, name: 'Тендеры' }
]


export const viewVariants: IIconVariants[] = [
    {
        id: 1, name: 'Horizontal', image: ` <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 1.99997H19.0007" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 6H16.0004" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 12H19.0007" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 16H16.0004" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1 2C1 1.73479 1.10537 1.48043 1.29292 1.29289C1.48047 1.10536 1.73485 1 2.00009 1H6.00043C6.26567 1 6.52005 1.10536 6.7076 1.29289C6.89515 1.48043 7.00052 1.73479 7.00052 2V6.00001C7.00052 6.26523 6.89515 6.51958 6.7076 6.70712C6.52005 6.89466 6.26567 7.00002 6.00043 7.00002H2.00009C1.73485 7.00002 1.48047 6.89466 1.29292 6.70712C1.10537 6.51958 1 6.26523 1 6.00001V2Z" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1 12C1 11.7348 1.10537 11.4804 1.29292 11.2929C1.48047 11.1054 1.73485 11 2.00009 11H6.00043C6.26567 11 6.52005 11.1054 6.7076 11.2929C6.89515 11.4804 7.00052 11.7348 7.00052 12V16C7.00052 16.2652 6.89515 16.5196 6.7076 16.7071C6.52005 16.8947 6.26567 17 6.00043 17H2.00009C1.73485 17 1.48047 16.8947 1.29292 16.7071C1.10537 16.5196 1 16.2652 1 16V12Z" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>`},
    {
        id: 2, name: 'Vertical', image: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1H7V7H1V1Z" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 1H17V7H11V1Z" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1 11H7V17H1V11Z" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.7773 11H16.7773V17H10.7773V11Z" stroke="#28252E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>`}
]

export const sortVariant: IIconVariants = {
    id: 3,
    name: 'Sort',
    image: `<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3.5C9 4.03043 9.21071 4.53914 9.58579 4.91421C9.96086 5.28929 10.4696 5.5 11 5.5C11.5304 5.5 12.0391 5.28929 12.4142 4.91421C12.7893 4.53914 13 4.03043 13 3.5C13 2.96957 12.7893 2.46086 12.4142 2.08579C12.0391 1.71071 11.5304 1.5 11 1.5C10.4696 1.5 9.96086 1.71071 9.58579 2.08579C9.21071 2.46086 9 2.96957 9 3.5Z" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M1 3.5H9" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M13 3.5H17" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M3 9.5C3 10.0304 3.21071 10.5391 3.58579 10.9142C3.96086 11.2893 4.46957 11.5 5 11.5C5.53043 11.5 6.03914 11.2893 6.41421 10.9142C6.78929 10.5391 7 10.0304 7 9.5C7 8.96957 6.78929 8.46086 6.41421 8.08579C6.03914 7.71071 5.53043 7.5 5 7.5C4.46957 7.5 3.96086 7.71071 3.58579 8.08579C3.21071 8.46086 3 8.96957 3 9.5Z" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M1 9.5H3" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M7 9.5H17" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M12 15.5C12 16.0304 12.2107 16.5391 12.5858 16.9142C12.9609 17.2893 13.4696 17.5 14 17.5C14.5304 17.5 15.0391 17.2893 15.4142 16.9142C15.7893 16.5391 16 16.0304 16 15.5C16 14.9696 15.7893 14.4609 15.4142 14.0858C15.0391 13.7107 14.5304 13.5 14 13.5C13.4696 13.5 12.9609 13.7107 12.5858 14.0858C12.2107 14.4609 12 14.9696 12 15.5Z" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M1 15.5H12" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M16 15.5H17" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`
}

export const mobileSortIcon: IIconVariants = {
    id: 4,
    name: 'mobileSort',
    image: `<svg width="26" height="26" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3.5C9 4.03043 9.21071 4.53914 9.58579 4.91421C9.96086 5.28929 10.4696 5.5 11 5.5C11.5304 5.5 12.0391 5.28929 12.4142 4.91421C12.7893 4.53914 13 4.03043 13 3.5C13 2.96957 12.7893 2.46086 12.4142 2.08579C12.0391 1.71071 11.5304 1.5 11 1.5C10.4696 1.5 9.96086 1.71071 9.58579 2.08579C9.21071 2.46086 9 2.96957 9 3.5Z" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M1 3.5H9" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M13 3.5H17" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M3 9.5C3 10.0304 3.21071 10.5391 3.58579 10.9142C3.96086 11.2893 4.46957 11.5 5 11.5C5.53043 11.5 6.03914 11.2893 6.41421 10.9142C6.78929 10.5391 7 10.0304 7 9.5C7 8.96957 6.78929 8.46086 6.41421 8.08579C6.03914 7.71071 5.53043 7.5 5 7.5C4.46957 7.5 3.96086 7.71071 3.58579 8.08579C3.21071 8.46086 3 8.96957 3 9.5Z" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M1 9.5H3" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M7 9.5H17" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M12 15.5C12 16.0304 12.2107 16.5391 12.5858 16.9142C12.9609 17.2893 13.4696 17.5 14 17.5C14.5304 17.5 15.0391 17.2893 15.4142 16.9142C15.7893 16.5391 16 16.0304 16 15.5C16 14.9696 15.7893 14.4609 15.4142 14.0858C15.0391 13.7107 14.5304 13.5 14 13.5C13.4696 13.5 12.9609 13.7107 12.5858 14.0858C12.2107 14.4609 12 14.9696 12 15.5Z" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M1 15.5H12" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M16 15.5H17" stroke="#28252E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`
}
