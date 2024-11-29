import { BaseDatabaseAdapterFactory } from "./DatabaseAdapterFactory";
import { InterfaceTypes } from "./DatabaseAdapterFactory";
import { FirebaseAdapter } from "./FirebaseAdapter";

export class FirebaseAdapterFactory extends BaseDatabaseAdapterFactory {
    public static override CreateAdapter<K extends keyof InterfaceTypes>(_collectionName: string, _parentDocumentId?: string, _subCollectionName?: string): InterfaceTypes[K] {
        return new FirebaseAdapter(_collectionName, _parentDocumentId, _subCollectionName) as InterfaceTypes[K];
    }
}