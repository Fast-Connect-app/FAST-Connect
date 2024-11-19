import { BaseDatabase } from "./BaseDatabase";

export interface ISaveById<T> extends BaseDatabase<T>{
    SaveById(id:string,data):Promise<void>;
}