import { BaseDatabase } from "./BaseDatabase";

export interface ISaveObject<T> extends BaseDatabase<T>{
    SaveObject(entity:T): Promise<void>;
}