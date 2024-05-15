export interface ICategory {
    id: number
    name: string
    parentId?: number | null
}

export interface ICategoriesWithSubcategories {
    id: number
    name: string
    parentId: number | null,
    depth: number,
    subcategories: ICategoriesWithSubcategories[]
}