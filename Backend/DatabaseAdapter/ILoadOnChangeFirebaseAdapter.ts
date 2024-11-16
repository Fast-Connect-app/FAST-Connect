import { FirebaseAdapter } from "./FirebaseDatabaseAdapter";

export interface ILoadOnChangeFirebaseAdapter<T> extends FirebaseAdapter<T>{
    LoadOnChange(id:string):Promise<T | null>;
}