export interface ILoadById{
    LoadById(id:string):Promise<object | null>;
}