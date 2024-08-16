import { AppThunk } from "@/storage";
import connection from "./connection.lib";
import { HubConnectionState } from "@microsoft/signalr";
import { IInvokeConnection, IOnConnection } from "../model/connection.model";

/**
 * Оболочка для работы с `connection` через библиотеку `signalr`
 */
export const wrapperConnection = (onList: IOnConnection[], invokeList: IInvokeConnection[]): AppThunk => async (dispatch) => {
    try {
        if (connection.state === HubConnectionState.Disconnected) {
            await connection.start();
            console.log('SignalR Connected.');
        }

        onList.map(on => {
            connection.on(on.name, (...args) => { on.handle(...args)(dispatch) });
        });
        invokeList.map(invoke => {
            connection.invoke(invoke.name, ...invoke.props);
        });
    } catch (err) {
        console.error('Error while establishing connection: ', err);
        setTimeout(() => dispatch(wrapperConnection(onList, invokeList)), 5000);
    }
};


/**
 * Остановка `connection`. Библиотека `signalr`
 */
export const stopConnection = () => {
    if (connection.state === HubConnectionState.Connected) {
        connection.stop();
    }
}
