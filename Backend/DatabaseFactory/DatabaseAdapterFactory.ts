import { ISaveObject } from "../DatabaseInterfaces/ISaveObject"
import { IModifyById } from "../DatabaseInterfaces/IModifyById"
import { ILoadById } from "../DatabaseInterfaces/ILoadById";
import { ILoadAll } from "../DatabaseInterfaces/ILoadAll";
import { ILoadForUser } from "../DatabaseInterfaces/ILoadForUser";
import { ILoadOnChange } from "../DatabaseInterfaces/ILoadOnChange";
import { IDelete } from "../DatabaseInterfaces/IDelete";
import {FirebaseAdapter} from "./FirebaseAdapter"

import {User} from "../Classes/User"

// Only implement interfaces that are required for each type

type InterfaceTypes<T> = {
    User: ISaveObject<T>;
    Profile: ISaveObject<T> & IModifyById<T>;
    Events: ISaveObject<T> & ILoadById<T> & ILoadAll<T>;
    Group: IModifyById<T> & ISaveObject<T> & ILoadForUser<T> & ILoadById<T> & IDelete<T>;
    Post: ISaveObject<T> & ILoadAll<T> & ILoadById<T> & IDelete<T>;
    DirectMessages: ILoadForUser<T> & IModifyById<T> & ISaveObject<T> & ILoadOnChange<T>;
    GroupMessages: ISaveObject<T> & IModifyById<T> & ILoadForUser<T> & ILoadOnChange<T>;
    GlobalMessages: ISaveObject<T> & IModifyById<T> & ILoadAll<T> & ILoadOnChange<T>;
    UserSaveContact: ISaveObject<T> & IModifyById<T> & ILoadForUser<T>;
    UserBlock: ISaveObject<T> & IModifyById<T> & IDelete<T> & ILoadForUser<T>;
    Jobs: ISaveObject<T> & ILoadAll<T> & ILoadById<T> & IDelete<T>;
}


export class DatabaseAdapterFactory{
    static CreateAdapter<T,K extends keyof InterfaceTypes<T>>(dbType:"firebase", _collectionName:string): InterfaceTypes<T>[K]{
        switch (dbType){
            case 'firebase':
                return new FirebaseAdapter<T>(_collectionName) as InterfaceTypes<T>[K];
                
            default:
                throw new Error("Unsupported Database type")
        }
    }
}