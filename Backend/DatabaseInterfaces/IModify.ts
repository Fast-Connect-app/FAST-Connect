export interface IModify{
    Modify(id:string, data:any):Promise<boolean>;
}