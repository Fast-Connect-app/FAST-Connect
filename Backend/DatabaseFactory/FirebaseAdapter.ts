import { IDelete } from "../DatabaseInterfaces/IDelete";
import { ILoadAll } from "../DatabaseInterfaces/ILoadAll";
import { ILoadById } from "../DatabaseInterfaces/ILoadById";
import { ILoadForUser } from "../DatabaseInterfaces/ILoadForUser";
import { ILoadOnChange } from "../DatabaseInterfaces/ILoadOnChange";
import { ISaveById } from "../DatabaseInterfaces/ISaveById";
import { ISaveObject } from "../DatabaseInterfaces/ISaveObject";
import { ILoadLimited } from "../DatabaseInterfaces/ILoadLimited";
import { ILoadForMember } from "../DatabaseInterfaces/ILoadForMember";
import { IModify } from "../DatabaseInterfaces/IModify";
import { ISubscriber } from "../Classes/ISubscriber";
import { IPublisher } from "../DatabaseInterfaces/IPublisher";
import { ILoadByName } from "../DatabaseInterfaces/ILoadByName";

//Loading Max Number
let maxLoads:number = 10;

//firebase imports
import { db } from "../FirebaseApp"

export class FirebaseAdapter implements IPublisher,IModify,ILoadAll,ILoadById,ILoadOnChange,ISaveById,ISaveObject,ILoadForUser,IDelete,ILoadLimited,ILoadForMember,ILoadByName{
    private collectionName : string;
    private parentDocumentId ?: string;
    private subCollectionName ?: string;

    private subscribers:ISubscriber[] = [];

    constructor(_collectionName:string, _parentDocumentId ?: string, _subCollectionName ?: string){
        this.collectionName = _collectionName;
        this.parentDocumentId = _parentDocumentId;
        this.subCollectionName = _subCollectionName;
    }

    AddSubscriber(subscriber: ISubscriber): void {
        this.subscribers.push(subscriber);
    }

    RemoveSubscriber(subscriber: ISubscriber): void {
        const index = this.subscribers.indexOf(subscriber);
        if (index > -1) {
            this.subscribers.splice(index, 1); // Removes 1 element at the specified index
        }
    }

    NotifySubscribers(data): void {
        this.subscribers.forEach(subscriber => {
            subscriber.ReceiveData(data);
        });
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
            console.error("Couldnt delete due to:", error);
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
            console.error("Couldnt delete due to:", error);
            return null;
        }
    }

    async LoadByName(field:string ,name: string): Promise<string | null> {
        try{
            let querySnapshotName;
            if(this.parentDocumentId && this.subCollectionName){
                //sub collection exists
                
                //get all the docs whose name or title is given
                querySnapshotName = await db.collection(this.collectionName)
                .doc(this.parentDocumentId)
                .collection(this.subCollectionName)
                .where( field ,"==", name).get()
            }
            else{
                querySnapshotName = await db.collection(this.collectionName)
                .where(field,"==",name).get();
            }

            //Get Json Data
            let data = querySnapshotName.docs.map(doc =>({ id:doc.id, ...doc.data() }));
            
            return JSON.stringify(data);
        }
        catch(error:any){
            console.error("Couldnt delete due to:", error);
            return null;
        }
    }

    async LoadOnChange(id: string): Promise<void> {
        try{  
            if(this.parentDocumentId && this.subCollectionName){
                //there is a sub collection

                db.collection(this.collectionName)
                .doc(this.parentDocumentId)
                .collection(this.subCollectionName)
                .onSnapshot(snapshot =>{
                    snapshot.docChanges().forEach(change => {
                        if (change.type === 'added') {
                            // New document added to the sub-collection
                            const newMessage = change.doc.data();
                            
                            // Notify your subscribers with the new message
                            this.NotifySubscribers(newMessage);
                        }
                    });
                })

            }
            else{
                db.collection(this.collectionName)
                .onSnapshot(snapshot =>{
                    snapshot.docChanges().forEach(change => {
                        if (change.type === 'added') {
                            // New document added to the sub-collection
                            const newMessage = change.doc.data();

                            // Notify your subscribers with the new message
                            this.NotifySubscribers(newMessage);
                        }
                    });
                })
            }
        }
        catch(error:any){
            console.error("Couldn't load because: ", error);
        }
    }

    async LoadLimited(iteration: number): Promise<string | null> {
        try {
            let collectionRef;
            if(this.parentDocumentId && this.subCollectionName){
                collectionRef = db.collection(this.collectionName)
                .doc(this.parentDocumentId)
                .collection(this.subCollectionName);
            }
            else{
                collectionRef = db.collection(this.collectionName);
            }
    
            // Base query: order by timestamp and limit the number of messages
            let query = collectionRef.orderBy("timeStamp","desc").limit(maxLoads);
    
            if (iteration > 1) {
                // Calculate the offset for the requested iteration
                const skipCount = (iteration - 1) * maxLoads;
                const snapshot = await collectionRef
                    .orderBy("timeStamp","desc")
                    .limit(skipCount)
                    .get();
    
                if (!snapshot.empty) {
                    // Get the last document from the previous query
                    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
                    query = query.startAfter(lastDoc); // Start the next batch after this document
                } 
                else {
                    return null; // No data available for the given iteration
                }
            }
    
            // Execute the query for the current batch
            const resultSnapshot = await query.get();
            const result = resultSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
    
            return JSON.stringify(result);
        } catch (error: any) {
            console.error("Error loading limited messages:", error);
            return null;
        }
    }

    async SaveObject(data): Promise<boolean> {   
        try{
            let docRef;

            if(this.parentDocumentId && this.subCollectionName){
                //there is a sub collection
                
                docRef = db.collection(this.collectionName)
                .doc(this.parentDocumentId)
                .collection(this.subCollectionName).doc()
            }
            else{
                docRef = db.collection(this.collectionName).doc()
            }

            await docRef.set(data);   
            return true;
        }
        catch(error:any){
            console.error("Couldn't Save Data because:",error);
            return false;
        }
    }

    async SaveById(id: string, data): Promise<boolean> {
        try{
            let docRef;
            if(this.parentDocumentId && this.subCollectionName){
                //there is a sub collection

                //generate a new document
                docRef = db.collection(this.collectionName)
                .doc(this.parentDocumentId)
                .collection(this.subCollectionName).doc(id)
            }
            else{
                docRef = db.collection(this.collectionName).doc(id)
            }

            await docRef.set(data);   
            return true;
        }
        catch(error:any){
            console.error("Couldn't Save Data because:",error);
            return false;
        }
    }

    async Modify(id: string, data: any): Promise<boolean> {
        try{
            let docRef;
            if(this.parentDocumentId && this.subCollectionName){
                //there is a sub collection
                
                docRef = db.collection(this.collectionName)
                .doc(this.parentDocumentId)
                .collection(this.subCollectionName).doc(id)
            }
            else{
                docRef = db.collection(this.collectionName).doc(id)
            }

            await docRef.update(data);   
            return true;
        }
        catch(error:any){
            console.error("Couldn't Modify data because:",error);
            return false;
        }
    }
}