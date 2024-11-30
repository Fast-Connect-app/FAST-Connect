export interface ISaveObject{
    SaveObject(data): Promise<boolean>;
}