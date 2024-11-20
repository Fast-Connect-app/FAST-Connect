import { BaseDatabase } from "./BaseDatabase";

export interface IModifyById<T> extends BaseDatabase<T>{
    ModifyById(id:string,data):Promise<void>;
}