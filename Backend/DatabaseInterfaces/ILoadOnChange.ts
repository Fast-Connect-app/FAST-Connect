import { BaseDatabase } from "./BaseDatabase";

export interface ILoadOnChange<T> extends BaseDatabase<T>{
    LoadOnChange(id:string):Promise<T | null>;
}