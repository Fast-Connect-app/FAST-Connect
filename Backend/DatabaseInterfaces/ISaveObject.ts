import { BaseDatabase } from "./BaseDatabase";

export interface ISaveObject<T> extends BaseDatabase<T>{
    SaveObject(entity:T,data): Promise<void>;
}