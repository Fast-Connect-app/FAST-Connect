export interface ISaveById{
    SaveById(id:string,data):Promise<boolean>;
}