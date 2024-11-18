import { BaseDatabase } from "./BaseDatabase";

export interface ILoadAll<T> extends BaseDatabase<T>{
    LoadAll():Promise<T[] | null>;
}