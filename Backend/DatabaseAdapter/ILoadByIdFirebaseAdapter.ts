import { FirebaseAdapter } from "./FirebaseDatabaseAdapter";

export interface ILoadByIdFirebaseAdapter<T> extends FirebaseAdapter<T>{
    LoadById(id:string):Promise<T | null>;
}