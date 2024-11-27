import { IDelete } from "../DatabaseInterfaces/IDelete";
import { ILoadAll } from "../DatabaseInterfaces/ILoadAll";
import { ILoadById } from "../DatabaseInterfaces/ILoadById";
import { ILoadForUser } from "../DatabaseInterfaces/ILoadForUser";
import { ILoadOnChange } from "../DatabaseInterfaces/ILoadOnChange";
import { IModifyById } from "../DatabaseInterfaces/IModifyById";
import { ISaveObject } from "../DatabaseInterfaces/ISaveObject";
import { ILoadLimited } from "../DatabaseInterfaces/ILoadLimited";


//firebase imports
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import * as serviceAccount from "../../credentials.json"
import { ILoadForMember } from "../DatabaseInterfaces/ILoadForMember";
import { BaseDatabaseAdapter } from "./BaseDatabaseAdapter";

// Authenticate the Firebase database
const app = initializeApp({
  credential: cert(serviceAccount as any),
});

const db: Firestore = getFirestore(app);

export class FirebaseAdapter extends BaseDatabaseAdapter implements ILoadAll,ILoadById,ILoadOnChange,IModifyById,ISaveObject,ILoadForUser,IDelete,ILoadLimited,ILoadForMember{
    private parentDocumentId ?: string;
    private subCollectionName ?: string;

    constructor(_collectionName:string, _parentDocumentId ?: string, _subCollectionName ?: string){
        super(_collectionName);
        this.parentDocumentId = _parentDocumentId;
        this.subCollectionName = _subCollectionName;
    }

    async LoadAll(): Promise <string[] | null> {
        return null;
    }

    async LoadById(id: string): Promise<string | null> {
        return null;
    }

    async LoadOnChange(id: string): Promise<string | null> {
        return null;
    }

    async LoadForUser(uid: string): Promise<string | null> {
        return null;
    }
    
    async Delete(id: string): Promise<void> {
        
    }

    async ModifyById(id: string,data): Promise<void> {
        
    }

    async SaveObject(data): Promise<void> {   
        
    }

    async LoadForMember(uid:string): Promise<string | null>{
        return null;
    }

    async LoadLimited(maxLoads: number): Promise<string | null> {
        return null;
    }
}