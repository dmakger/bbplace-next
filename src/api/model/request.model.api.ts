
export interface IArgsRequest {
    limit?: number | undefined
    page?: number | undefined,
    filter?: string,
    params?: IParamsRequest

}

export interface IParamsRequest {
    SearchQuery?: string | undefined | null;
    [key: string]: string | undefined | null;
}