
export enum DataStateEnum {
    LOADING,
    LOADED,
    ERROR
}

export interface APPDataState<T> {
    dataState: DataStateEnum,
    data?: T,
    errorMessage?: string
}