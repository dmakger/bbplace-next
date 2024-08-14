import { IArgsRequest, IParamsRequest } from "@/api/api/model/request.model.api"


export const getURL = (url: string, args?: IArgsRequest) => {
    if (!args) return url
    
    let _url = url
    if (_url.endsWith('/'))
        _url = _url.slice(0, -1)
    
    if (args.limit !== undefined) 
        _url += `/${args.limit}`

    if (args.page !== undefined) 
        _url += `/${args.page}`

    if (args.filter !== undefined) 
        _url += `?${args.filter}`
 
    const params = paramsToURL(args.params)

    if (params)
        _url += '?'
    return _url + params
}


export const paramsToURL = (params?: IParamsRequest) => {
    if (!params) return ''
    return Object.keys(params)
        .filter((key) => {
            const value = params[key];
            return value !== null && value !== undefined && value.toString() !== '-1' && value.toString() !== '';
        })
        .map((key) => `${key}=${params[key]!.toString()}`)
        .join('&')
}


// export const parseParams = (data: { [key: string]: any}, hasQuestion=true) => {
//     let start = '?'
//     if (!hasQuestion)
//         start = ''
//     return start + Object.keys(data)
//         .filter((key) => {
//             const value = data[key];
//             return value !== null && value !== undefined && value.toString() !== '-1' && value.toString() !== '';
//         })
//         .map((key) => `${key}=${data[key].toString()}`)
//         .join('&')
// }