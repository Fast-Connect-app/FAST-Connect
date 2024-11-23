import { BaseDatabase } from "./BaseDatabase";

export interface ILoadForUser<T> extends BaseDatabase<T>{
    LoadForUser(uid:string):Promise<T | null>;
}