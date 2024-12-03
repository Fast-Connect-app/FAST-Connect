import { IDelete } from "../DatabaseInterfaces/IDelete";
import { ILoadAll } from "../DatabaseInterfaces/ILoadAll";
import { ILoadById } from "../DatabaseInterfaces/ILoadById";
import { ILoadOnChange } from "../DatabaseInterfaces/ILoadOnChange";
import { ISaveById } from "../DatabaseInterfaces/ISaveById";
import { ISaveObject } from "../DatabaseInterfaces/ISaveObject";
import { ILoadLimited } from "../DatabaseInterfaces/ILoadLimited";
import { ILoadForMember } from "../DatabaseInterfaces/ILoadForMember";
import { IModify } from "../DatabaseInterfaces/IModify";
import { ISubscriber } from "../Classes/ISubscriber";
import { ILoadByName } from "../DatabaseInterfaces/ILoadByName";

//Loading Max Number
const maxLoads: number = 10;

//firebase imports
import { db } from "../FirebaseApp";
import { DocumentData } from "firebase-admin/firestore";

export class FirebaseAdapter
  implements
    IModify,
    ILoadAll,
    ILoadById,
    ILoadOnChange,
    ISaveById,
    ISaveObject,
    IDelete,
    ILoadLimited,
    ILoadForMember,
    ILoadByName
{
  private collectionName: string;
  private parentDocumentId?: string;
  private subCollectionName?: string;

  private subscribers: ISubscriber[] = [];

  constructor(
    _collectionName: string,
    _parentDocumentId?: string,
    _subCollectionName?: string
  ) {
    this.collectionName = _collectionName;
    this.parentDocumentId = _parentDocumentId;
    this.subCollectionName = _subCollectionName;
  }
  /**
   * Adds a subscriber to the list of subscribers.
   * @param subscriber - The subscriber to be added.
   */
  AddSubscriber(subscriber: ISubscriber): void {
    this.subscribers.push(subscriber);
  }
  /**
   * Removes a subscriber from the list of subscribers.
   * @param subscriber - The subscriber to be removed.
   */
  RemoveSubscriber(subscriber: ISubscriber): void {
    const index = this.subscribers.indexOf(subscriber);
    if (index > -1) {
      this.subscribers.splice(index, 1); // Removes 1 element at the specified index
    }
  }
  /**
   * Notifies all subscribers with the provided data.
   * @param data - The data to be sent to the subscribers.
   */
  NotifySubscribers(data: string): void {
    this.subscribers.forEach((subscriber) => {
      subscriber.ReceiveData(data);
    });
  }

  /**
   * Loads all documents from the collection or sub-collection.
   * @returns A promise that resolves to a JSON string of all documents or null if an error occurs.
   */
  async LoadAll(): Promise<object | null> {
    try {
      let querySnapshot;
      if (this.parentDocumentId && this.subCollectionName) {
        //there is a sub collection

        //get all the data from a collection
        querySnapshot = await db
          .collection(this.collectionName)
          .doc(this.parentDocumentId)
          .collection(this.subCollectionName)
          .get();
      } else {
        querySnapshot = await db.collection(this.collectionName).get();
      }

      //Transform data into JSON
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return data;
    } catch (error) {
      console.error("Error loading documents:", error);
      return null;
    }
  }
  /**
   * Loads a document by its ID from the collection or sub-collection.
   * @param id - The ID of the document to be loaded.
   * @returns A promise that resolves to a JSON string of the document or null if an error occurs.
   */
  async LoadById(id: string): Promise<object | null> {
    try {
      let querySnapshot;
      if (this.parentDocumentId && this.subCollectionName) {
        //there is a sub collection

        //get the data of a document with id given
        querySnapshot = await db
          .collection(this.collectionName)
          .doc(this.parentDocumentId)
          .collection(this.subCollectionName)
          .doc(id)
          .get();
      } else {
        querySnapshot = await db.collection(this.collectionName).doc(id).get();
      }

      //Transform data into JSON
      const data = { id: querySnapshot.id, ...querySnapshot.data() };
      return data;
    } catch (error) {
      console.error("Error loading documents with id:", error);
      return null;
    }
  }
  /**
   * Loads documents for a specific user by their UID.
   * @param uid - The UID of the user.
   * @returns A promise that resolves to a JSON string of the documents or null if an error occurs.
   */
  async LoadForUser(uid: string): Promise<string | null> {
    try {
      let querySnapshot;

      // Fetch documents from the sub-collection or main collection
      if (this.parentDocumentId && this.subCollectionName) {
        querySnapshot = await db
          .collection(this.collectionName)
          .doc(this.parentDocumentId)
          .collection(this.subCollectionName)
          .get();
      } else {
        querySnapshot = await db.collection(this.collectionName).get();
      }

      // Filter documents where the ID contains the substring `uid`
      const data = querySnapshot.docs
        .filter((doc) => doc.id.includes(uid)) // Check if the ID contains the substring `uid`
        .map((doc) => ({ id: doc.id, ...doc.data() }));

      return JSON.stringify(data);
    } catch (error) {
      console.error("Error loading documents for user:", error);
      return null;
    }
  }

  /**
   * Deletes a document by its ID from the collection or sub-collection.
   * @param id - The ID of the document to be deleted.
   * @returns A promise that resolves to true if the document is deleted successfully, otherwise false.
   */
  async Delete(id: string): Promise<boolean> {
    try {
      if (this.parentDocumentId && this.subCollectionName) {
        //sub collection exists

        await db
          .collection(this.collectionName)
          .doc(this.parentDocumentId)
          .collection(this.subCollectionName)
          .doc(id)
          .delete();

        return true;
      } else {
        await db.collection(this.collectionName).doc(id).delete();
        return true;
      }
    } catch (error) {
      console.error("Couldnt delete due to:", error);
      return false;
    }
  }
  /**
   * Loads documents for a specific member by their UID.
   * @param uid - The UID of the member.
   * @returns A promise that resolves to a JSON string of the documents or null if an error occurs.
   */
  async LoadForMember(uid: string): Promise<object | null> {
    try {
      let querySnapshot;
      if (this.parentDocumentId && this.subCollectionName) {
        //sub collection exists

        querySnapshot = await db
          .collection(this.collectionName)
          .doc(this.parentDocumentId)
          .collection(this.subCollectionName)
          .where("members", "array-contains", uid)
          .get();
      } else {
        querySnapshot = await db
          .collection(this.collectionName)
          .where("members", "array-contains", uid)
          .get();
      }

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return data;
    } catch (error) {
      console.error("Couldnt delete due to:", error);
      return null;
    }
  }
  /**
   * Loads documents by a specific field and name.
   * @param field - The field to be searched.
   * @param name - The name to be matched.
   * @returns A promise that resolves to a JSON string of the documents or null if an error occurs.
   */
  async LoadByName(field: string, name: string): Promise<object | null> {
    try {
      let querySnapshotName;
      if (this.parentDocumentId && this.subCollectionName) {
        //sub collection exists

        //get all the docs whose name or title is given
        querySnapshotName = await db
          .collection(this.collectionName)
          .doc(this.parentDocumentId)
          .collection(this.subCollectionName)
          .where(field, "==", name)
          .get();
      } else {
        querySnapshotName = await db
          .collection(this.collectionName)
          .where(field, "==", name)
          .get();
      }

      //Get Json Data
      const data = querySnapshotName.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return data;
    } catch (error) {
      console.error("Couldnt delete due to:", error);
      return null;
    }
  }
  /**
   * Sets up a listener for changes in the collection or sub-collection and notifies subscribers.
   * @param _id - The ID of the document to be monitored.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async LoadOnChange(_id: string): Promise<void> {
    try {
      if (this.parentDocumentId && this.subCollectionName) {
        //there is a sub collection

        db.collection(this.collectionName)
          .doc(this.parentDocumentId)
          .collection(this.subCollectionName)
          .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                // New document added to the sub-collection
                const newMessage = change.doc.data();

                // Notify your subscribers with the new message
                this.NotifySubscribers(newMessage.string);
              }
            });
          });
      } else {
        db.collection(this.collectionName).onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              // New document added to the sub-collection
              const newMessage = change.doc.data();

              // Notify your subscribers with the new message
              this.NotifySubscribers(newMessage.string);
            }
          });
        });
      }
    } catch (error) {
      console.error("Couldn't load because: ", error);
    }
  }
  /**
   * Loads a limited number of documents based on the iteration.
   * @param iteration - The iteration number to determine the offset.
   * @returns A promise that resolves to a JSON string of the documents or null if an error occurs.
   */
  async LoadLimited(iteration: number): Promise<object | null> {
    try {
      let collectionRef;
      if (this.parentDocumentId && this.subCollectionName) {
        collectionRef = db
          .collection(this.collectionName)
          .doc(this.parentDocumentId)
          .collection(this.subCollectionName);
      } else {
        collectionRef = db.collection(this.collectionName);
      }

      // Base query: order by timestamp and limit the number of messages
      let query = collectionRef.orderBy("timeStamp", "desc").limit(maxLoads);

      if (iteration > 1) {
        // Calculate the offset for the requested iteration
        const skipCount = (iteration - 1) * maxLoads;
        const snapshot = await collectionRef
          .orderBy("timeStamp", "desc")
          .limit(skipCount)
          .get();

        if (!snapshot.empty) {
          // Get the last document from the previous query
          const lastDoc = snapshot.docs[snapshot.docs.length - 1];
          query = query.startAfter(lastDoc); // Start the next batch after this document
        } else {
          return null; // No data available for the given iteration
        }
      }

      // Execute the query for the current batch
      const resultSnapshot = await query.get();
      const result = resultSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return result;
    } catch (error) {
      console.error("Error loading limited messages:", error);
      return null;
    }
  }
  /**
   * Saves a new document with the provided data to the collection or sub-collection.
   * @param data - The data to be saved.
   * @returns A promise that resolves to true if the document is saved successfully, otherwise false.
   */
  async SaveObject(data: DocumentData): Promise<boolean> {
    try {
      let docRef;

      if (this.parentDocumentId && this.subCollectionName) {
        //there is a sub collection

        docRef = db
          .collection(this.collectionName)
          .doc(this.parentDocumentId)
          .collection(this.subCollectionName)
          .doc();
      } else {
        docRef = db.collection(this.collectionName).doc();
      }

      await docRef.set(data);
      return true;
    } catch (error) {
      console.error("Couldn't Save Data because:", error);
      return false;
    }
  }
  /**
   * Saves a document with the provided ID and data to the collection or sub-collection.
   * @param id - The ID of the document to be saved.
   * @param data - The data to be saved.
   * @returns A promise that resolves to true if the document is saved successfully, otherwise false.
   */
  async SaveById(id: string, data: DocumentData): Promise<boolean> {
    try {
      let docRef;
      if (this.parentDocumentId && this.subCollectionName) {
        //there is a sub collection

        //generate a new document
        docRef = db
          .collection(this.collectionName)
          .doc(this.parentDocumentId)
          .collection(this.subCollectionName)
          .doc(id);
      } else {
        docRef = db.collection(this.collectionName).doc(id);
      }

      await docRef.set(data);
      return true;
    } catch (error) {
      console.error("Couldn't Save Data because:", error);
      return false;
    }
  }
  /**
   * Modifies an existing document with the provided ID and data in the collection or sub-collection.
   * @param id - The ID of the document to be modified.
   * @param data - The data to be updated.
   * @returns A promise that resolves to true if the document is modified successfully, otherwise false.
   */
  async Modify(id: string, data: object): Promise<boolean> {
    try {
      let docRef;
      if (this.parentDocumentId && this.subCollectionName) {
        //there is a sub collectiom
        docRef = db
          .collection(this.collectionName)
          .doc(this.parentDocumentId)
          .collection(this.subCollectionName)
          .doc(id);
      } else {
        docRef = db.collection(this.collectionName).doc(id);
      }
      await docRef.update(data);
      return true;
    } catch (error) {
      console.error("Couldn't Modify data because:", error);
      return false;
    }
  }
}
