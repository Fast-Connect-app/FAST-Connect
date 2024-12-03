export interface ISaveObject{
    SaveObject(data:any): Promise<string>;
}