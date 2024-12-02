import { InterfaceTypes } from "./InterfaceTypes";

export class BaseDatabaseAdapterFactory {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static CreateAdapter<K extends keyof InterfaceTypes>(_collectionName: string, _parentDocumentId?: string, _subCollectionName?: string): InterfaceTypes[K] {
    throw new Error("CreateAdapter Method not implemented.");
  }
}

export function GetDatabaseAdapter<K extends keyof InterfaceTypes>(adapterFactoryType: typeof BaseDatabaseAdapterFactory, _collectionName: string, _parentDocumentId?: string, _subCollectionName?: string): InterfaceTypes[K] {
  return adapterFactoryType.CreateAdapter<K>(_collectionName, _parentDocumentId, _subCollectionName);
}
