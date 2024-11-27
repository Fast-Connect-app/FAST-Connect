export interface ILoadForUser{
    LoadForUser(uid:string):Promise<string | null>;
}