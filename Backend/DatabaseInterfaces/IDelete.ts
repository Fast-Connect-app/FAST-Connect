import { BaseDatabase } from "./BaseDatabase";

export interface IDelete<T> extends BaseDatabase<T>{
    Delete(id:string):Promise<void>;
}