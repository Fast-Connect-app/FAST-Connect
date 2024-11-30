export interface ILoadByName{
    LoadByName(name:string):Promise<string | null>;
}