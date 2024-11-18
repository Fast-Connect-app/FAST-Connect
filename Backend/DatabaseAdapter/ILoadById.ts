import { BaseDatabase } from "./BaseDatabase";

export interface ILoadById<T> extends BaseDatabase<T>{
    LoadById(id:string):Promise<T | null>;
}