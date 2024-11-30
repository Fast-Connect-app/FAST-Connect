import { IDelete } from "../DatabaseInterfaces/IDelete";
import { ILoadAll } from "../DatabaseInterfaces/ILoadAll";
import { ILoadById } from "../DatabaseInterfaces/ILoadById";
import { ILoadForUser } from "../DatabaseInterfaces/ILoadForUser";
import { ILoadOnChange } from "../DatabaseInterfaces/ILoadOnChange";
import { ISaveById } from "../DatabaseInterfaces/ISaveById";
import { ISaveObject } from "../DatabaseInterfaces/ISaveObject";
import { ILoadLimited } from "../DatabaseInterfaces/ILoadLimited";
import { ILoadForMember } from "../DatabaseInterfaces/ILoadForMember";


//firebase imports
import { db } from "../FirebaseApp"
import { ILoadByName } from "../DatabaseInterfaces/ILoadByName";

export class FirebaseAdapter implements ILoadAll,ILoadById,ILoadOnChange,ISaveById,ISaveObject,ILoadForUser,IDelete,ILoadLimited,ILoadForMember,ILoadByName{
    private collectionName : string;
    private parentDocumentId ?: string;
    private subCollectionName ?: string;

    constructor(_collectionName:string, _parentDocumentId ?: string, _subCollectionName ?: string){
        this.collectionName = _collectionName;
        this.parentDocumentId = _parentDocumentId;
        this.subCollectionName = _subCollectionName;
    }

    async LoadAll(): Promise <string | null> {
        try{
            let querySnapshot;
            if(this.parentDocumentId && this.subCollectionName){
                //there is a sub collection

                //get all the data from a collection
                querySnapshot = await db.collection(this.collectionName)
                .doc(this.parentDocumentId)
                .collection(this.subCollectionName).get()
            }
            else{
                querySnapshot = await db.collection(this.collectionName).get();
            }

            //Transform data into JSON
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            return JSON.stringify(data);
        }
        catch(error:any){
            console.error("Error loading documents:", error);
            return null;
        }
    }

    async LoadById(id: string): Promise<string | null> {
        try{
            let querySnapshot;
            if(this.parentDocumentId && this.subCollectionName){
                //there is a sub collection

                //get the data of a document with id given
                querySnapshot = await db.collection(this.collectionName)
                .doc(this.parentDocumentId)
                .collection(this.subCollectionName)
                .doc(id).get()
            }
            else{
                querySnapshot = await db.collection(this.collectionName).doc(id).get();
            }

            //Transform data into JSON
            const data = { id: querySnapshot.id, ...querySnapshot.data() }

            return JSON.stringify(data);
        }
        catch(error:any){
            console.error("Error loading documents with id:", error);
            return null;
        }
    }

    async LoadForUser(uid: string): Promise<string | null> {
        try {
            let querySnapshot;
    
            // Fetch documents from the sub-collection or main collection
            if (this.parentDocumentId && this.subCollectionName) {
                querySnapshot = await db
                    .collection(this.collectionName)
                    .doc(this.parentDocumentId)
                    .collection(this.subCollectionName).get();
            } 
            else {
                querySnapshot = await db.collection(this.collectionName).get();
            }
    
            // Filter documents where the ID contains the substring `uid`
            const data = querySnapshot.docs
                .filter(doc => doc.id.includes(uid)) // Check if the ID contains the substring `uid`
                .map(doc => ({ id: doc.id, ...doc.data() }));
    
            return JSON.stringify(data);
        } 
        catch (error: any) {
            console.error("Error loading documents for user:", error);
            return null;
        }
    }
    
    async Delete(id: string): Promise<boolean> {
        try{
            if(this.parentDocumentId && this.subCollectionName){
                //sub collection exists
                
                await db.collection(this.collectionName)
                .doc(this.parentDocumentId)
                .collection(this.subCollectionName)
                .doc(id).delete()

                return true;
            }
            else{
                await db.collection(this.collectionName).doc(id).delete()
                return true;
            }
        }
        catch(error:any){
            console.log("Couldnt delete due to:", error);
            return false;
        }
    }

    async LoadForMember(uid:string): Promise<string | null>{
        try{
            let querySnapshot;
            if(this.parentDocumentId && this.subCollectionName){
                //sub collection exists
                
                querySnapshot = await db.collection(this.collectionName)
                .doc(this.parentDocumentId)
                .collection(this.subCollectionName)
                .where("members","array-contains",uid).get()
            }
            else{
                querySnapshot = await db.collection(this.collectionName)
                .where("members","array-contains",uid).get()
            }

            const data = querySnapshot.docs.map(doc =>({ id:doc.id, ...doc.data() }));

            return JSON.stringify(data);
        }
        catch(error:any){
            console.log("Couldnt delete due to:", error);
            return null;
        }
    }

    async LoadByName(name: string): Promise<string | null> {
        try{
            let querySnapshotName;
            let querySnapshotTitle;
            if(this.parentDocumentId && this.subCollectionName){
                //sub collection exists
                
                //get all the docs whose name or title is given
                querySnapshotName = await db.collection(this.collectionName)
                .doc(this.parentDocumentId)
                .collection(this.subCollectionName)
                .where( "name" ,"==", name).get()

                querySnapshotTitle = await db.collection(this.collectionName)
                .doc(this.parentDocumentId)
                .collection(this.subCollectionName)
                .where( "title" ,"==", name).get()
            }
            else{
                querySnapshotName = await db.collection(this.collectionName)
                .where("name","==",name).get();

                querySnapshotTitle = await db.collection(this.collectionName)
                .where("title","==",name).get()
            }

            //Get Json Data
            let dataName = querySnapshotName.docs.map(doc =>({ id:doc.id, ...doc.data() }));
            let dataTitle = querySnapshotName.docs.map(doc =>({ id:doc.id, ...doc.data() }));
            
            //combine the 2 arrays
            let combined = dataName.concat(dataTitle);
            
            return JSON.stringify(combined);
        }
        catch(error:any){
            console.log("Couldnt delete due to:", error);
            return null;
        }
    }

    async LoadOnChange(id: string): Promise<string | null> {
        return null;
    }

    async LoadLimited(maxLoads: number): Promise<string | null> {
        return null;
    }

    async SaveObject(data): Promise<boolean> {   
        return false;
    }

    async SaveById(id: string, data): Promise<boolean> {
        return false;
    }
}