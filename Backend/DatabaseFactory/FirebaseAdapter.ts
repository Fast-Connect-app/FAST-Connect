import { IDelete } from "../DatabaseInterfaces/IDelete";
import { ILoadAll } from "../DatabaseInterfaces/ILoadAll";
import { ILoadById } from "../DatabaseInterfaces/ILoadById";
import { ISaveById } from "../DatabaseInterfaces/ISaveById";
import { ISaveObject } from "../DatabaseInterfaces/ISaveObject";
import { ILoadForMember } from "../DatabaseInterfaces/ILoadForMember";
import { IModify } from "../DatabaseInterfaces/IModify";
import { ILoadByName } from "../DatabaseInterfaces/ILoadByName";

//firebase imports
import { db } from "../FirebaseApp";
import { DocumentData } from "firebase-admin/firestore";

export class FirebaseAdapter
  implements
    IModify,
    ILoadAll,
    ILoadById,
    ISaveById,
    ISaveObject,
    IDelete,
    ILoadForMember,
    ILoadByName
{
  private collectionName: string;
  private parentDocumentId?: string;
  private subCollectionName?: string;

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
          .where("usersList", "array-contains", uid)
          .get();
      } else {
        querySnapshot = await db
          .collection(this.collectionName)
          .where("usersList", "array-contains", uid)
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
   * Saves a new document with the provided data to the collection or sub-collection.
   * @param data - The data to be saved.
   * @returns A promise that resolves to true if the document is saved successfully, otherwise false.
   */
  async SaveObject(data: DocumentData): Promise<string> {
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

      await docRef.set({id:docRef.id,...data});
      return docRef.id;
    } catch (error) {
      console.error("Couldn't Save Data because:", error);
      return "";
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

      await docRef.set({id:id,...data});
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
