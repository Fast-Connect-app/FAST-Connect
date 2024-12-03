export interface ISaveById{
    SaveById(id:string,data:any):Promise<boolean>;
}