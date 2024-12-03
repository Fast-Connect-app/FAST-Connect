export interface ILoadForUser{
    LoadForUser(uid:string):Promise<object | null>;
}