export interface ILoadById{
    LoadById(id:string):Promise<string | null>;
}