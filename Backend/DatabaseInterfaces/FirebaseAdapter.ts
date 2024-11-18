import { IDelete } from "../DatabaseAdapter/IDelete";
import { ILoadAll } from "../DatabaseAdapter/ILoadAll";
import { ILoadById } from "../DatabaseAdapter/ILoadById";
import { ILoadForUser } from "../DatabaseAdapter/ILoadForUser";
import { ILoadOnChange } from "../DatabaseAdapter/ILoadOnChange";
import { ISaveById } from "../DatabaseAdapter/ISaveById";
import { ISaveObject } from "../DatabaseAdapter/ISaveObject";

export class FirebaseAdapter<T> implements ILoadAll<T>,ILoadById<T>,ILoadOnChange<T>,ISaveById<T>,ISaveObject<T>,ILoadForUser<T>,IDelete<T>{
    private collectionName : string;
    private parentDocumentID ?: string;
    private subCollectionID ?: string;

    constructor(_collectionName:string,_parentDocumentID ?: string, _subCollectionID ?: string){
        this.collectionName = _collectionName;
        this.parentDocumentID = _parentDocumentID;
        this.subCollectionID = _subCollectionID;
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

    async SaveById(id: string): Promise<void> {
    
    }

    async SaveObject(entity: T): Promise<void> {   
    
    }

    async LoadForUser(uid: string): Promise<T | null> {
        return null;
    }

    async Delete(id: string): Promise<void> {
        
    }
}