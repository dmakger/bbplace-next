import { AppThunk } from "@/storage";
import connection from "./connection.lib";
import { HubConnectionState } from "@microsoft/signalr";
import { IConnectionItem } from "../model/connection.model";

/**
 * Оболочка для работы с `connection` через библиотеку `signalr`
 */
export const wrapperConnection = (connectionList: IConnectionItem[]): AppThunk => async (dispatch) => {
    try {
        if (connection.state === HubConnectionState.Disconnected) {
            await connection.start();
            console.log('SignalR Connected.');
        }

        connectionList.map(it => {
            const { on, invoke } = it;
            connection.on(on.name, (...args) => { on.handle(...args)(dispatch) });
            if (invoke)
                connection.invoke(invoke.name, ...invoke.props);
        });
    } catch (err) {
        console.error('Error while establishing connection: ', err);
        setTimeout(() => dispatch(wrapperConnection(connectionList)), 5000);
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
