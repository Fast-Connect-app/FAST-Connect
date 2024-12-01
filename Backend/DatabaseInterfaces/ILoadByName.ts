export interface ILoadByName{
    LoadByName(field:string ,name:string):Promise<string | null>;
}