export interface IModify{
    Modify(id:string, data):Promise<boolean>;
}