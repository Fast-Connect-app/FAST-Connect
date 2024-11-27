export interface ILoadForMember{
    LoadForMember(uid:string):Promise<string | null>;
}