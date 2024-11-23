import { IDelete } from "../DatabaseInterfaces/IDelete";
import { ILoadAll } from "../DatabaseInterfaces/ILoadAll";
import { ILoadById } from "../DatabaseInterfaces/ILoadById";
import { ILoadForUser } from "../DatabaseInterfaces/ILoadForUser";
import { ILoadOnChange } from "../DatabaseInterfaces/ILoadOnChange";
import { IModifyById } from "../DatabaseInterfaces/IModifyById";
import { ISaveObject } from "../DatabaseInterfaces/ISaveObject";

//firebase imports
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import * as serviceAccount from "../../credentials.json"

// Authenticate the Firebase database
const app = initializeApp({
  credential: cert(serviceAccount as any),
});

const db: Firestore = getFirestore(app);

export class FirebaseAdapter<T> implements ILoadAll<T>,ILoadById<T>,ILoadOnChange<T>,IModifyById<T>,ISaveObject<T>,ILoadForUser<T>,IDelete<T>{
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

    async ModifyById(id: string,data): Promise<void> {
        
    }

    async SaveObject(data): Promise<void> {   
        
    }
}