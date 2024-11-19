import { IDelete } from "../DatabaseInterfaces/IDelete";
import { ILoadAll } from "../DatabaseInterfaces/ILoadAll";
import { ILoadById } from "../DatabaseInterfaces/ILoadById";
import { ILoadForUser } from "../DatabaseInterfaces/ILoadForUser";
import { ILoadOnChange } from "../DatabaseInterfaces/ILoadOnChange";
import { ISaveById } from "../DatabaseInterfaces/ISaveById";
import { ISaveObject } from "../DatabaseInterfaces/ISaveObject";

export class FirebaseAdapter<T> implements ILoadAll<T>,ILoadById<T>,ILoadOnChange<T>,ISaveById<T>,ISaveObject<T>,ILoadForUser<T>,IDelete<T>{
    private collectionName : string;

    constructor(_collectionName:string){
        this.collectionName = _collectionName;
    }

    async LoadAll(): Promise <T[] | null> {
        return null;
    }

    async LoadById(id: string): Promise<T | null> {
        return null;
    }

    async LoadOnChange(id: string): Promise<T | null> {
        return null;
    }

    async LoadForUser(uid: string): Promise<T | null> {
        return null;
    }
    
    async Delete(id: string): Promise<void> {
        
    }

    async SaveById(id: string,data): Promise<void> {
    
    }

    async SaveObject(entity: T,data): Promise<void> {   
    
    }
}