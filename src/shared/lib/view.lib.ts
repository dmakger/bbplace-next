import { IViewToIs } from "../model/view.model"

// Функция написанна для работы с VIEW и SIZE. 
// Необходимо передавать данные от меньшего к большему, т.к. возвращается самое первое View
// Пример передаваемых аргументов: [
//      {view: ESupplierToChatViewItem.LARGE, _is: is768},
//      {view: ESupplierToChatViewItem.SMALL, _is: is1024},
//      {view: ESupplierToChatViewItem.LARGE_WIDE, _is: true},
// ]
export const getViewByIsList = (data: IViewToIs[]) => {
    return data.filter(it => it._is)[0].view
}