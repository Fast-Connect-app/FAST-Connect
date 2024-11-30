export interface IDelete{
    Delete(id:string):Promise<boolean>;
}