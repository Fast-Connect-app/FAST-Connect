import { FirebaseAdapter } from "./FirebaseDatabaseAdapter";

export interface ILoadAllFirebaseAdapter<T> extends FirebaseAdapter<T>{
    LoadAll():Promise<T[] | null>;
}