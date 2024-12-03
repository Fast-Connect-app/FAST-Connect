export interface ILoadForMember{
    LoadForMember(uid:string):Promise<object | null>;
}