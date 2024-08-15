/**
 * Обработчик события для `signalr`
 */
export interface IOnConnection {
    name: string
    handle: (...args: any[]) => any
}

/**
 * Отправка данных  для `signalr`
 */
export interface IInvokeConnection {
    name: string
    props: any[]
}


/**
 * Обработчик и отправитель данных для `signalr`
 */
export interface IConnectionItem {
    on: IOnConnection,
    invoke?: IInvokeConnection,
}