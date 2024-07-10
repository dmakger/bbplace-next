import { ReactElement, ReactNode, isValidElement } from "react";
import { IRow, ITable, IUnionColumn, _IRow } from "../model/table.model";
import React from "react";

// 1, 4; 2, 3;
// export const toStableUnionColumns = (unions: IUnionColumn[]) => {
//     const starts: number[] = []
//     const ends: number[] = []
//     // const stableUnions: IUnionColumn[] = []
// }

/**
 * 
 * @param head - head table
 * @param unions - list [IUnionColumn] has [start] and [end]. 
 * @param sep - separator
 * @returns updateHead
 */
export const unionHeadTable = (head: ITable['head'], unions: IUnionColumn[], sep=', ') => {
    return unions.reduce((updateHead, union) => {
        const newColumn = updateHead.slice(union.start, union.end).join(sep)
        if (!newColumn)
          return updateHead
          
        const before = updateHead.slice(0, union.start)
        const after = updateHead.slice(union.end)
        return [...before, newColumn, ...after]
    }, head)
}



export const unionDataTable = (data: IRow[], unions: IUnionColumn[], unionsRest?: IUnionColumn[], wrapper?: ITable['wrapperForUnions']): IRow[] => {
    return data.map((row) => {
        return {
            row: unionCellTable(row.row, unions, wrapper),
            rest: row.rest && unionsRest ? row.rest.map(it => unionCellTable(it, unionsRest, wrapper)) : row.rest,
            isShowRest: row.isShowRest
        } as IRow
    });
};


export const unionCellTable = (row: _IRow, unions: IUnionColumn[], wrapper?: ITable['wrapperForUnions']) => {
    return unions.reduce((updatedRow, union) => {
        const before = updatedRow.slice(0, union.start);

        const newColumnContent = updatedRow.slice(union.start, union.end);
        const newColumnClassName = newColumnContent[0].className;
        const newColumnNodes = newColumnContent.map(it => it.cell);

        let newColumn = <>{newColumnNodes}</>;
        if (wrapper) {
            newColumn = React.createElement(wrapper, {}, newColumnNodes); 
        }
        const after = updatedRow.slice(union.end);

        return [...before, {cell: newColumn, className: newColumnClassName}, ...after];
    }, row);
}