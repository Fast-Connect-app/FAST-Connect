import { FirebaseAdapter } from "./FirebaseDatabaseAdapter";

export interface ISaveObjectFirebaseAdapter<T> extends FirebaseAdapter<T>{
    SaveObject(entity:T): Promise<void>;
}