import { BaseDatabase } from "./BaseDatabase";

export interface ISaveObject<T> extends BaseDatabase<T>{
    SaveObject(data): Promise<void>;
}