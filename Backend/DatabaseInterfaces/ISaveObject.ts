export interface ISaveObject{
    SaveObject(data:any): Promise<boolean>;
}