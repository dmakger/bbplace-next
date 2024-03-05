export interface IOption {
    id: number
    name: string
    value?: string | number
    options?: IOption[]
}
