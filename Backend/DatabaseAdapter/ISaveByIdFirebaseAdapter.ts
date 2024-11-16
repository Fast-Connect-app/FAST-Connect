import { FirebaseAdapter } from "./FirebaseDatabaseAdapter";

export interface ISaveByIdFirebaseAdapter<T> extends FirebaseAdapter<T>{
    SaveById(id:string):Promise<void>;
}